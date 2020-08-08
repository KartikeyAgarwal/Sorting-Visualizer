export function getBubbleSortAnimations(array) {
    let animations =[];
    // if(array.length<=1) return array;
    let auxArray = array.slice();
    bubbleSort(auxArray,animations);
    return animations;
}

function bubbleSort(auxillaryArray, animations) {
    const N = auxillaryArray.length;
    let iters = N - 1;
    while(iters > 0) {
        let swapped = false;
        for(let i = 0; i < iters; ++i) {
            animations.push(["comparision1", i, i + 1]);
            animations.push(["comparision2", i, i + 1]);
            if(auxillaryArray[i] > auxillaryArray[i + 1]) {
                swapped = true;
                animations.push(["swap", i, auxillaryArray[i + 1]]);
                animations.push(["swap", i + 1, auxillaryArray[i]]);
                swap(auxillaryArray, i, i + 1);
            }
        }
        if(swapped === false) break;
        iters--;
    }
}

function swap(auxArray, fstIdx, scdIdx)
{
    let temp=auxArray[fstIdx];
    auxArray[fstIdx]=auxArray[scdIdx];
    auxArray[scdIdx]=temp;
}