export function filterBy(option, filter, labelKey) {
	return option[labelKey].toLowerCase().indexOf(filter.toLowerCase()) > -1;
}
