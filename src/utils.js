export function filterByName(a, name, labelKey) {
	return a[labelKey].toLowerCase().indexOf(name.toLowerCase()) > -1;
}
