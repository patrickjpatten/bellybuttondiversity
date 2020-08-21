d3.json("samples.json").then (sampledata =>{
    //console.log(sampledata);
    var keys = Object.keys(sampledata.names)
    var labels = Object.values(sampledata.names);
    //console.log(keys)
    //console.log(labels);

    //trying to get away to pull the index when given the label
    var result = {};
    keys.forEach((key, i) => result[key] = labels[i]);
    //console.log(result);
    //So i have a dictionary now
    //How many entries do i have?
    //console.log(labels.length);

    //Create the drop down menu
    var ddlIDs = document.getElementById("selDataset");
    //Add options to the dropdown list
        for (var i = 0; i<labels.length; i++){
            var option = document.createElement("OPTION");
        //Set ID value in Text part.
            option.innerHTML = labels[i];
        //Set ID Value in Value part.
            option.value = labels[i]; 
        //Add the Option element to DropDownList.
            ddlIDs.options.add(option); 
            
    };
  // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updatePlotly);
            function updatePlotly() {
        // Use D3 to select the dropdown menu
            var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
            var ID = dropdownMenu.property("value");
            console.log(ID);
            var key = Object.keys(result).find(key => result[key] === ID);
            console.log(key);
            var metadata = (sampledata.metadata[key]);
            console.log(metadata);
            var samples = (sampledata.samples[key]);
            console.log(samples)
            var OtuIDS = sampledata.samples[key].otu_ids.slice(0,10).map(x=> `OTU ${x}`);
            console.log(OtuIDS.toString())
            var OtuValues = (sampledata.samples[key].sample_values)
            console.log(OtuValues)
            var handwashes = (sampledata.metadata[key].wfreq)
            console.log(handwashes)

            // Lets just get the horizontal bar chart going
            var trace1 = {
                type:'bar',
                x: OtuValues.slice(0,10),
                y: OtuIDS,
                orientation: 'h',
                text: OtuIDS
            };
            var data1 = [trace1];
            var layout = {
                title: "Top 10 OTU & Values"
                };
            Plotly.newPlot("bar", data1, layout);
            // Bubble chart
            var trace2 = {
                x: OtuIDS,
                y: OtuValues,
                mode: 'markers',
                marker: {
                    size: OtuValues
                }
            };
            var data2 = [trace2];
            var layout = {
                title: 'OTU Bubbles',
                showlegend: false,
                
            };
            Plotly.newPlot('bubble', data2, layout);

            var data = [
                {
                  domain: { x: [0, 1], y: [0, 1] },
                  value: handwashes,
                  title: { text: "Hand Wash Frequency" },
                  type: "indicator",
                  mode: "gauge+number+delta",
                  gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                      { range: [0, 4.5], color: "lightgray" },
                      { range: [4.5, 9], color: "gray" }
                    ],
                    threshold: {
                      line: { color: "red", width: 4 },
                      thickness: 0.75,
                      value: handwashes
                    }
                  }
                }
              ];
              
              var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
              Plotly.newPlot('gauge', data, layout);
// MetaData Table 
var metaData = Object.values(sampledata.metadata);
// console.log(metaData)
var ethnicity = sampledata.metadata[key].ethnicity;
// console.log(ethnicity)
var gender = sampledata.metadata[key].gender;
// console.log(gender)
var age = sampledata.metadata[key].age;
// console.log(age)
var location = sampledata.metadata[key].location;
// console.log(location)
var bbtype = sampledata.metadata[key].bbtype;
// console.log(bbtype)
var wfreq = sampledata.metadata[key].wfreq;
// console.log(wfreq)
// select where to place data in the HTML
var tbody = d3.select("#sample-metadata");
var trow;
// filter metaData to identify the index that matches ID (returns list of 1 object)
var filteredMeta = metaData.filter(x => x.id == ID)
// console.log(filteredMeta)
var metaResult = filteredMeta[0];
// clear table from previous entry
tbody.html("");   
// Loop through metaResult array and print key/value metadata in table
Object.entries(metaResult).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
  trow = tbody.append("tr");
  trow.append("td").text(`${key}: ${value}`);
      });


            // MetaData Table 



            
            
            
        //     var metadataHTML = d3.select("sample-metadata")
        //         //Add options to the dropdown list
        // for (var i = 0; i<7; i++){
        //     var option = document.createElement("h3");
        // //Set ID value in Text part.
        //     option.innerHTML = labels[i];
        // //Set ID Value in Value part.
        //     option.value = labels[i]; 
        // //Add the Option element to DropDownList.
        //     ddlIDs.options.add(option); 

            // var demographicInfo = document.getElementById("sample-metadata")
            // //Add options to the dropdown list
            //     for (var i = 0; i<labels.length; i++){

            

    };

  });





//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use `sample_values` as the values for the bar chart.
// Use `otu_ids` as the labels for the bar chart.
// Use `otu_labels` as the hovertext for the chart.





