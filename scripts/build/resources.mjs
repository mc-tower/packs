import { readFile, writeFile } from 'fs'

/**
 * Convert nested resources description to plain list of resources
 *
 * @param  {Object} resources Resources to convert
 * @param  {String} current   Currect 'directory' in resources
 * @return {String[]}         Resulting list of resources
 */
function resources2list(resources, current = '') {
	let result = [], prefix
	for (let folder of Object.keys(resources)) {
		if (folder === '.' || resources[folder] instanceof Array) {
			prefix = folder === '.' ? current : current + folder + '/'

			result.push(...resources[folder].map((file) => prefix + file))
		} else {
			prefix = current + folder + '/'

			result.push(...resources2list(resources[folder], prefix))
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
			files: resources2list(content)
		}), (err) => { if (err) throw err })
	})
}

export function run(buildFolder) {
	const packsFolder = buildFolder + '/resourcepacks'

	readFile(packsFolder + '/list.json', (err, data) => {
		if (err) throw err
		const list = blob2json(data)

		list.categories.forEach((category) => {
			category.packs.forEach((pack) => {
				convertResources(
					`${packsFolder}/${category.id}/${pack.id}/resources.json`
				)
			})
		})
	})
}
