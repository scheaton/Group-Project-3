## Project-3

**Team Members:** AJ Domingo, Samuel Heaton, Alice Johnson, Jananee Arjunan, Mia Tsivitse

## UFO Sightings Reported in USA

![Top_Image](https://user-images.githubusercontent.com/112193116/212521106-dba04ca4-6526-45c1-bf1b-af28998a25a7.png)

**PROJECT SCOPE**

 UFO sightings have been reported in all 50 U.S. states during the last century, and the sightings have varied greatly in terms of overall characteristics such as the  UFO shape and size. 


  We explored data from the National UFO Reporting Center (NUFORC) on UFO sightings within the U.S. during July - December 2022. During 2022, there were 4.6K total UFO sightings and 2K occurred in recent months (July - December 2022). 
We discovered patterns in the sightings reported to the NUFORC and showcased data through visualizations such as a Leaflet heatmap and Plotly charts.

**DATA SOURCES**

 * Nuforc.org: Reportings by Sighting Date, Jul - Dec ‘22, ~2K records([https://nuforc.org/webreports/ndxevent.html])

 * Google Maps API - Latitude/Longitude Coordinates

**DATA EXTRACTION**

  We scraped 2K UFO sighting records from NUFORC’s data bank between the months of July 2022 - December 2022 ([https://nuforc.org/webreports/ndxevent.html]). To scrape  the sightings data, we created a Beautiful Soup object and extracted the data we were interested in. We utilized a for loop to create a list of rows and append the record data. We repeated this process for each month of data within the target, assembling dataframes and .csv supplied with the following information specific to the sighting: sighting date, city, state, country, shape, duration, summary, date posted and whether an image was supplied. 
We found that our web scrape from NUFORC was missing one critical element to support our data visualizations: latitude and longitude coordinates. In order to obtain these data points, we utilized the Google Maps API. Using the concatenated city/state, we created a for loop to access the data we needed. After cleaning and merging the dataframes, we created a finalized dataset in .csv format.

**DATA TRANSFORMATION**

  We transformed our NUFORC + Google Maps API data to fit the needs for our visualizations. In jupyter notebook, we have merged the scraped and API data and dropped  null values to get the final data for our plots. Used the groupby function to organize the data to reflect UFO sightings by hour of day (UTC), sightings by state, and sightings by month of year during the reporting period. We exported this data to .csv format and prepared for the connection to the database.

**DATA LOADING**

  Using PostgreSQL created a  database “ufo_sightings”. This included the “sighting” table which contains all the UFO sightings, the “states” sightings table, the “months” sightings table and the “hours” sightings table. 

**BACK END**

  In order to deploy our page to Github Pages, we needed to route our static links to css, js, and img files using url_for to call on our pages correctly. After replacing all the links, we established navbar.html as our base html to avoid repeating our code and ensure the navbar is visible on each page. The base page includes the starter html, style sheet references, jquery, bootstrap formatting, and navbar code.  Each page has specific flask api calls and js file calls so we added code blocks in navbar.html at the title, head, and body to leave space for additional formatting. From there, each page’s html continues the navbar.html code while replacing the specified blocks in the code for customization per page. After formatting is complete, we can then pass the finished build through Freezer.py which freezes all the html files and hardcodes all of our url_for links into links to be deployed from the base_url: https://scheaton.github.io/Group-Project-3/

**FRONT END**

  We utilized two JavaScript libraries not already covered in our class lectures. These two libraries were Bideo.js (for full screen background video) as well as Granim.js (for gradient animations). The bideo.js library is used on the background of our homepage, where a looping UFO montage video plays. We created .js files to establish the functions, set dimensions and resizing, and ensure video played upon the page loading. The Granim.js library is used on the background of the visualization pages, where a fullscreen forest image has a changing gradient overlay. The gradient colors and looping were established in the respective .js files.
  
  We sorted our visualizations into three separate pages, based on the style of the visualization (Leaflet heatmap, Plotly pie chart, Plotly bar charts). We organized the files for all of the pages into Template and Static folders (Static folders were organized by .css, .js and image files) and our Template folder contained all of our .html files.
  
  To drive engagement, we added several user-driven interactions for our visualizations, such as layers (base and overlay) for the leaflet UFO sightings heatmap, a dropdown for sightings by state and hover and zoom functionalities for the Plotly bar charts. These user interactions were added to the respective .js files for each of our pages. 

**VISUALIZATIONS & DATA FINDINGS**

  We created several visualizations to represent our findings. This included a Leaflet heatmap of all UFO sightings in the U.S. during the reported time period. The heatmap includes two base layers (Street Map and Topographic Map) as well as two overlays (UFO Sightings Heatmap and UFO Sightings Info). Markers have been assigned to UFO sightings for our sightings overlay according to the coordinates within our dataset. When selecting the marker, the details specific to the UFO sighting will populate, including the city, state, date reported, and description of the sighting. The heatmap overlay indicates locations with a high frequency of UFO sightings including major cities such as: New York City, Washington DC, Tampa, Detroit, Chicago, Los Angeles, San Francisco and Seattle. 
  
  The UFO sightings by shape visualization breaks down all sightings within the U.S. by UFO shape by percentage, as well as percentages of UFO shapes for each state (utilizing the dropdown functionality). Amongst all U.S. sightings, UFOs falling in the shape category “other” made up 27.4% of the total, followed by the non-distinct shape categorized as “light” at 19.1%.

  Additional visualizations to support UFO sightings data included UFO sightings by state, month, and hour of day (UTC). Using our transformed datasets, our visualizations provided us with the following insights: CA saw the highest total UFO sightings by state at 203 during the reported time period (July - December 2022), followed by Florida at 152 total sightings. Across all U.S. sightings, September saw the highest total of sightings at 455(22% of the total), and sightings declined MoM thereafter through the end of the year. Amongst all sightings, most sightings occurred between the hours of 19:00 - 23:00 (UTC). We left the hours in UTC to account for the differing time zones throughout the U.S. This insight indicates to us that most sightings occurred during the late evening and nighttime. 


* Leaflet map- UFO Sightings in the U.S 
   * Marker layer with sighting summaries and date
   
   ![Markers1_latest](https://user-images.githubusercontent.com/112193116/213025048-c12e0be4-9376-4cc8-9abc-74966c97c059.png)
     
   * Heatmap layer showing density of sightings 
   
   ![HeatMap_latest](https://user-images.githubusercontent.com/112193116/213025345-3aec7393-f7bb-4e32-8442-71a142a254bb.png)
     
* Pie Chart - UFO Sightings by Shape 

    ![Pie_charts](https://user-images.githubusercontent.com/112193116/213025055-772c633d-2129-41c9-8971-3f9ca54482d2.png)
  
* Bar Chart - UFO Sightings by State 

* Bar Chart - UFO Sightings by Month 

* Bar Chart - UFO Sightings by Hour of Day (UTC)  

   ![Charts_Latest](https://user-images.githubusercontent.com/112193116/213025045-a922455f-1d11-489a-9948-4a7d2f9b9fea.png)

 




