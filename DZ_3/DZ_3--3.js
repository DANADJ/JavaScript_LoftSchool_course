function compArray(arr1, arr2){
	// Если длины не равны, сразу false
	if(arr1.length != arr2.length) return false;

	// Сравниваем кажый элемент
	for(var i = arr1.length - 1; i >= 0; i--){
		if(arr1[i] != arr2[i]) return false;
	}

	// Если все в порядке, true
	return true;
}

function compObj(o1, o2){
	// Если длины не равны, сразу false
	var keys1 = Object.keys(o1);
	var keys2 = Object.keys(o2);
	if(keys1.length != keys2.length) return false;

	// Сравниваем кажый элемент
	for(k in o1){
		if(o1[k] != o2[k]) return false;
	}

	// Если все в порядке, true
	return true;
}