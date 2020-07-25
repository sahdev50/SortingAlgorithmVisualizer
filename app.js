//var x = document.getElementById("bar-numbers").value;

var count = 1 + 50, //count = 1 + x;
    durationTime = 2000/15, // durationTime = 2000/(count/3);
    array = d3.shuffle(d3.range(1,count)),
    unsortedArray = [...array],
    sortedArray = [],
    stop = false;

var margin = {top: 40, right: 40, bottom: 180, left: 40},
    width = 760 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var barWidth = width/count;

var x = d3.scaleLinear()
    .domain([0,count])
    .range([0, width]);

var svg = d3.select("#array").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + 0 + ")")
  
var rects = svg.append("g")
    .attr("transform", "translate(" + barWidth + ",2)")
    .selectAll("rect")
    .data(unsortedArray)
  .enter().append("rect")

rects.attr("id", function(d) {return "rect" + d})
    .attr("transform", function(d, i) {return "translate(" + (x(i) - barWidth) + ",0)"})
    .attr("width", barWidth *.9)
    .attr("height", function(d) {return d*barWidth/3})

function reset() {
    document.getElementById("text").innerHTML = "_Sorting - Visualizer_";
    unsortedArray = [...array];
    sortedArray = [];
    stop = false;
       
    rects.attr("class", "")                
        .transition().duration(2000)
        .attr("transform", function(d, i) {return "translate(" + (x(i-1)) + ", 0)"})
}

function slide(d, i) {
    
    d3.select("#rect" + d)
        .transition().duration(durationTime)
        .attr("transform", function(d) {return "translate(" + (x(i-1)) + ", 0)"})                
}

function insertionSort() {
    document.getElementById("text").innerHTML = "_Insertion - Sort_";
    var value = unsortedArray.shift();
    sortedArray.push(value);      
    reArrange(sortedArray.length-1);

    function reArrange(n) {
        if (stop) return stop = false;            

        d3.selectAll("rect").attr("class", "")                
        d3.select("#rect" + value).attr("class", "testing")
        
        if (n > 0 && sortedArray[n-1] > value) {
            d3.timeout(function() {
                sortedArray.splice(n,1);
                sortedArray.splice(n-1,0,value);

                slide(sortedArray[n], n);
                slide(sortedArray[n-1], n-1);

                reArrange(--n)
            }, durationTime * 2);
        } else if (unsortedArray.length) {
            d3.timeout(function() {insertionSort()}, durationTime * 2);
        } else {
        
            return d3.selectAll("rect").attr("class", "")
        }
    }
}

function selectionSort() {
    document.getElementById("text").innerHTML = "_Selection - Sort_";
    var min = count,
        spliceIndex,
        i = 0;

    function findMin() {
        if (stop) return stop = false;

        d3.timeout(function() {
        
            if (i<=unsortedArray.length) {

                d3.select("#rect" + unsortedArray[i]).attr("class", "testing")

                d3.timeout(function() {
                    
                    d3.select("#rect" + unsortedArray[i]).attr("class", "")

                    if (unsortedArray[i] < min) {
                        d3.select("#rect" + unsortedArray[i]).attr("class", "min")
                        d3.select("#rect" + min).attr("class", "")
                        min = unsortedArray[spliceIndex = i]
                    }
                    i++;

                    d3.timeout(function() {return findMin()}, durationTime/2);

                }, durationTime/2);

            } else {

                sortedArray.push(min);
                unsortedArray.splice(spliceIndex,1);

            rects.transition().duration(durationTime * 4)
                .attr("transform", function(d) {
                    var xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : unsortedArray.indexOf(d) + sortedArray.length;
                    return "translate(" + x(xVal - 1) + ",0)" 
                })

                rects.attr("class", "")

                d3.timeout(function() {
                    if (unsortedArray.length > 0) selectionSort();
                }, durationTime);
                return;
            }                
        })
    }
    findMin();
}

function bubbleSort() {
    document.getElementById("text").innerHTML = "_Bubble - Sort_";
    function sortPass(i) {
        if (!unsortedArray.length || stop) return stop = false

        if (i<=unsortedArray.length) {
            if (unsortedArray[i] < unsortedArray[i-1]) {

                d3.select("#rect" + unsortedArray[i]).attr("class", "testing")
                d3.select("#rect" + unsortedArray[i-1]).attr("class", "min")
                
                d3.timeout(function() {
                    d3.select("#rect" + unsortedArray[i]).attr("class", "")
                    d3.select("#rect" + unsortedArray[i-1]).attr("class", "")                                            
                }, durationTime);

                var temp = unsortedArray[i-1];
                unsortedArray[i-1] = unsortedArray[i];
                unsortedArray[i] = temp;

                slide(unsortedArray[i], i + sortedArray);
                slide(unsortedArray[i-1], i-1 + sortedArray);

                d3.timeout(function() {return sortPass(++i)}, durationTime);

            } else if (i == unsortedArray.length) {

                for (n = i; n == unsortedArray[n-1]; n--) {
                    unsortedArray.pop();
                }              

                sortPass(++i);
            } else {               
                sortPass(++i);
            }

        } else {
            bubbleSort();
        }
    }
    sortPass(1);
}

function mergeSort() {
    document.getElementById("text").innerHTML = "_Merge - Sort_";
    var mergeReps = (unsortedArray.length).toString(2).length + 1;
    var mergeArrays = [[...unsortedArray], []];

    for (i=0; i<unsortedArray.length; i += 2) {
        mergeArrays[1].push(mergeTwo([unsortedArray[i]], [unsortedArray[i+1]]))
    }
    for (n=2; n<mergeReps; n++) {
        mergeArrays[n] = [];
        var unMerged = mergeArrays[n-1];
        for (i=0; i<unMerged.length; i += 2) {
            mergeArrays[n].push(mergeTwo(unMerged[i], unMerged[i+1] ? unMerged[i+1] : []))
        }
    }
    for (i=1; i<mergeArrays.length; i++) {
        mergeArrays[i] = d3.merge(mergeArrays[i])
    }
    mergeMove(0);

    function mergeTwo(iArray, nArray) {
        var newArray = [];
        for (var i=0, n=0; i<iArray.length || n<nArray.length;) {
            if (iArray[i] < nArray[n]) {
                newArray.push(iArray[i++])
            } else if (iArray[i] > nArray[n]) {
                newArray.push(nArray[n++])
            } else if (!(iArray[i])) {
                newArray.push(nArray[n++])
            } else if (!(nArray[n])) {
                newArray.push(iArray[i++])
            }
        }
        return newArray;
    }

    function mergeMove(j) {
        var oldArray = mergeArrays[j],
            newArray = [...mergeArrays[j+1]],
            sortedArray = [];

        moveStep(0);

        function moveStep(n) {
            if (stop) return stop = false;            
            d3.selectAll("rect").attr("class", "")                

            d3.select("#rect" + newArray[n]).attr("class", "testing")

            sortedArray.push(newArray[n])
            oldArray.shift()

            rects.transition().duration(durationTime)
                .attr("transform", function(d) {
                    var xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : oldArray.indexOf(d) + sortedArray.length;
                    return "translate(" + x(xVal - 1) + ",0)" 
                })

            d3.timeout(function() {
                if (oldArray.length > 0) {
                    moveStep(++n)
                } else if (mergeArrays[j + 2]) {
                    mergeMove(++j)
                } else {
                    rects.classed("testing", false)
                }
            }, durationTime);
        }
    }
}
