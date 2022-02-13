import {
	readFile,
	readFileSync,
	writeFile,
	writeFileSync
} from 'fs'

/**
 * Convert nested folder structure to plain list of paths
 *
 * @param  {Object} nested    Nested structure to convert
 * @param  {String} current   Currect 'directory' in nested
 * @return {String[]}         Resulting list of paths
 */
function nested2list(nested, current = '') {
	let result = [], prefix
	for (let folder of Object.keys(nested)) {
		if (folder === '.' || nested[folder] instanceof Array) {
			prefix = folder === '.' ? current : current + folder + '/'

			result.push(...nested[folder].map((file) => prefix + file))
		} else {
			prefix = current + folder + '/'

			result.push(...nested2list(nested[folder], prefix))
		}
	}
	return result
}

const blob2json = (b) => JSON.parse(b.toString())

function convertResources(res_path) {
	readFile(res_path, (err, data) => {
		if (err) throw err
		const content = blob2json(data)

		writeFile(res_path, JSON.stringify({
			files: nested2list(content)
		}), (err) => { if (err) throw err })
	})
}

async function convertAll(buildFolder, list, categories_list) {
	let result = {
		categories: []
	}

	let categories = {}
	categories_list.forEach((c) => {
		categories[c.id] = {
			name: c.name,
			packs: []
		}
	})

	// convert info.json from all packs to list.json

	for (let path of list) {
		const data = readFileSync(`${buildFolder}/${path}/info.json`)
		const info = JSON.parse(data)
		categories[info.category].packs.push({
			id: info.id,
			name: info.name,
			description: info.description || "",
			incompatible: info.incompatible || [],
			versions: info.versions || [],
		})

		if (info.versions) {
			info.versions.forEach((v) => {
				convertResources(`${buildFolder}/${path}/versions/${v.folder}/resources.json`)
			})
		} else {
			convertResources(`${buildFolder}/${path}/resources.json`)
		}
	}

	Object.keys(categories).forEach((c) => {
		result.categories.push({
			id: c,
			name: categories[c].name,
			packs: categories[c].packs,
		})
	})

	writeFileSync(`${buildFolder}/resourcepacks/list.json`, JSON.stringify(result))
}

export function run(buildFolder) {
	readFile(buildFolder + '/resourcepacks/list.json', (err, data) => {
		if (err) throw err
		const list = nested2list(blob2json(data))

		readFile(buildFolder + '/resourcepacks/categories.json', (err, data) => {
			if (err) throw err
			convertAll(buildFolder, list, JSON.parse(data).categories)
		})
	})
}
