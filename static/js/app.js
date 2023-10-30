
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let names = [];
let demographic_metadata = [];
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
    // // get the names(id) list
    names = data.names;
    // get a object with the demographic info
    demographic_metadata = data.metadata;
    // get a object with the samples data
    samples = data.samples;
    var number_items = demographic_metadata.length;
    // call functions to print information 
    console.log("this is names in  "+ number_items);
    create_element_option(names);
    demographic_info(demographic_metadata);
    bar_plot(samples);
    bubble_plot(samples)
    
});

// // On change to the DOM, call update_data()
d3.selectAll("#selDataset").on("change", update_data);

// the following function create options elements in the select element
// with id="selDataset"
function create_element_option(names=[]){
    const html_element = document.getElementById("selDataset");
    for (let i = 0;i<names.length;i++){
        const option = document.createElement("option");
        option.value = names[i]
        option.text = names[i]
        html_element.add(option);
    }
}

// the demographic_info function fill the demographic data 
// depending of the code in the test object id select element 
function demographic_info(object_demographic_metadata){
    // get the element with id selDataset
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    let dataset = dropdownMenu.property("value");

    const html_element = document.getElementById("sample-metadata");
    // check the info of the element select to fill the demographic info
    for(var i= 0; i<object_demographic_metadata.length; i++){ 
        
        if (object_demographic_metadata[i].id == dataset){
            Object.entries(object_demographic_metadata[i]).forEach(([key, value]) => {
                console.log(`${key}: ${value}`)
                const html_element = document.getElementById("sample-metadata");    
                const p_tag = document.createElement("p");
                const node = document.createTextNode(`${key}: ${value}`);
                p_tag.appendChild(node);
                html_element.appendChild(p_tag);
            });
        }
    }

}

// this function shows the default bar plot
function bar_plot(samples_data){
    // get the element with id selDataset
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    let dataset = dropdownMenu.property("value");

    const html_element = document.getElementById("sample-metadata");
    // check the info of the element select to fill the demographic info
    

    for(var i= 0; i< samples_data.length; i++){ 
        // i =2;
        if (samples_data[i].id == dataset){
            let otu_ids_data = samples_data[i].otu_ids;
            let otu_label_data = samples_data[i].otu_labels;   
            let sample_values_data = samples_data[i].sample_values;
            // the following if just take the 10 first otus
            if (otu_ids_data.length > 10) {
                // first_10 = 10;
                otu_ids_data = otu_ids_data.slice(0,10)
                otu_label_data = otu_label_data.slice(0,10)
                sample_values_data = sample_values_data.slice(0, 10);
            }
            
            let otu_ids_data_string = [];
            for(j=0; j < otu_ids_data.length; j++){
            otu_ids_data_string[j] = "OTU "+ otu_ids_data[j].toString();
            
            }
            reversed_otu_ids_data = otu_ids_data_string.reverse();
            reversed_sample_values_data = sample_values_data.reverse();
            reversed_otu_label_data = otu_label_data.reverse();
            let data_plot = [{
                x: reversed_sample_values_data,
                y: otu_ids_data_string,
                text: reversed_otu_label_data,
                type: "bar",
                orientation: "h"
            }];

        // let data_plot = [trace1];

        let layout_plot = {
        title: "Top 10 OTUs found in Test Subject ID No.:"+ dataset +" ",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
            }
        };
        Plotly.newPlot("bar", data_plot, layout_plot);

        i= samples_data.length;    
        }
    }

}


// new bar plot with update data
function bar_plot_update(samples_data){
    // get the element with id selDataset
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    let dataset = dropdownMenu.property("value");

    const html_element = document.getElementById("sample-metadata");
    // check the info of the element select to fill the demographic info
    

    for(var i= 0; i< samples_data.length; i++){ 
        // i =2;
        if (samples_data[i].id == dataset){
            let otu_ids_data = samples_data[i].otu_ids;
            let otu_label_data = samples_data[i].otu_labels;   
            let sample_values_data = samples_data[i].sample_values;
            
            if (otu_ids_data.length > 10) {
                // first_10 = 10;
                otu_ids_data = otu_ids_data.slice(0,10)
                otu_label_data = otu_label_data.slice(0,10)
                sample_values_data = sample_values_data.slice(0, 10);
            }
            
            let otu_ids_data_string = [];
            for(j=0; j < otu_ids_data.length; j++){
            otu_ids_data_string[j] = "OTU "+ otu_ids_data[j].toString();
            }
            reversed_otu_ids_data = otu_ids_data_string.reverse();
            reversed_sample_values_data = sample_values_data.reverse();
            reversed_otu_label_data = otu_label_data.reverse();
            let data_plot = [{
                x: reversed_sample_values_data,
                y: otu_ids_data_string,
                text: reversed_otu_label_data,
                type: "bar",
                orientation: "h"
            }];

        // let data_plot = [trace1];

        let layout_plot = {
        title: "Top 10 OTUs found in Test Subject ID No.: "+ dataset +" .",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
            }
        };
        // Plotly.newPlot("bar", data_plot, layout_plot);
        Plotly.react("bar", data_plot, layout_plot);
        // Plotly.restyle("bar", data_plot, layout_plot);
        i= samples_data.length;    
        }
    }

}

// the next function will draw the bubble chart
// this function shows the default bubble chart plot
function bubble_plot(samples_data){
    // get the element with id selDataset
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    let dataset = dropdownMenu.property("value");

    const html_element = document.getElementById("sample-metadata");
    // check the info of the element select to fill the demographic info
    

    for(var i= 0; i< samples_data.length; i++){ 
        // i =2;
        if (samples_data[i].id == dataset){
            let otu_ids_data = samples_data[i].otu_ids;
            let otu_label_data = samples_data[i].otu_labels;   
            let sample_values_data = samples_data[i].sample_values;
            
            let data_plot = [{
                x: otu_ids_data,
                y: sample_values_data,
                text: otu_label_data,
                mode: 'markers',
                marker: {
                    color: otu_ids_data,
                    size : sample_values_data
                }
                
            }];

        // let data_plot = [trace1];

        let layout_plot = {
            title: "Bubble Chart of all OTUs found in Test Subject ID No.: "+ dataset +" .",
            showlegend: false,
            height: 450,
            width: 900
        };
        Plotly.newPlot("bubble", data_plot, layout_plot);
        
        i= samples_data.length;    
        }
    }

}

// the next function update the the bubble chart plot
function bubble_plot_update(samples_data){
    // get the element with id selDataset
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    let dataset = dropdownMenu.property("value");

    const html_element = document.getElementById("sample-metadata");
    // check the info of the element select to fill the demographic info
    

    for(var i= 0; i< samples_data.length; i++){ 
        // i =2;
        if (samples_data[i].id == dataset){
            let otu_ids_data = samples_data[i].otu_ids;
            let otu_label_data = samples_data[i].otu_labels;   
            let sample_values_data = samples_data[i].sample_values;
            
            let data_plot = [{
                x: otu_ids_data,
                y: sample_values_data,
                text: otu_label_data,
                mode: 'markers',
                marker: {
                    color: otu_ids_data,
                    size : sample_values_data
                }
                
            }];

        // let data_plot = [trace1];

        let layout_plot = {
            title: "Bubble Chart of all OTUs found in Test Subject ID No.: "+ dataset +" .",
            showlegend: false,
            height: 450,
            width: 900
        };
        // Plotly.newPlot("bubble", data_plot, layout_plot);
        Plotly.react("bubble", data_plot, layout_plot);
        i= samples_data.length;    
        }
    }

}

//the function update_data will update the data when the value
// in the test object id change (select new option)
function update_data(){

    //this code clean the data of the demographic info (from the paragraph tab)
    var parent = document.getElementById("sample-metadata");
    var pTag = parent.querySelectorAll('p');
    pTag.forEach(function(p) {
        p.innerHTML = "";
        
    });

    d3.json(url).then(function(data) {
    console.log(data);
    // get the names(id) list
    names = data.names;
    // get the demographic info
    demographic_metadata = data.metadata
    // get tje samples
    samples = data.samples;
    
    // call functions to print information 
    demographic_info(demographic_metadata);
    bar_plot_update(samples);
    bubble_plot_update(samples);
    
    });
}


