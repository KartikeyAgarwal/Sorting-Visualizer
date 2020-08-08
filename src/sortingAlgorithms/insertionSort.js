export function getInsertionSortAnimations(array) 
{
    let animations=[];
    let auxArray = array.slice();
    insertionSort(auxArray,animations);
    const javaScriptArray = array.slice().sort((a,b) => a-b);
    console.log("sort works correctly? ", arraysAreEqual(javaScriptArray,auxArray));
    array = auxArray;
    return animations;
}

function insertionSort(auxArray,animations)
{
    const N = auxArray.length;
    for(let i=1;i < N; i++)
    {
        let key= auxArray[i];
        let j= i - 1;
        animations.push(["comparision1",j,i]);
        animations.push(["comparision2",j,i]);
        while(j>=0 && auxArray[j] > key)
        {
            animations.push(["overwrite",j+1,auxArray[j]]);
            auxArray[j+1] = auxArray[j];
            j=j-1;
            if(j>=0)
            {
                animations.push(["comparision1",j,i]);
                animations.push(["comparision2",j,i]);
            }
        }
        animations.push(["overwrite",j+1, key]);
        auxArray[j+1] =  key;
    }
}

function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }
    return true;
}