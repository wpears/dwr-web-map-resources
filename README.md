##So you want to make a web app...

###Join the ArcGIS Server Cadre
* Send Wyatt Pearsall your SAP employee number

* Meetings are held the third Wednesday of each month in 435 Resources at 2pm.

* Try to engage at the meetings or over email, both for your benefit and the cadre's.

* See [https://dwrgis.water.ca.gov/arcgis_server_cadre](https://dwrgis.water.ca.gov/arcgis_server_cadre) for more info.


###Publish a Service
* Put your data and map in a folder under **\\\\nasgisnp\entgis\cadre**

* Connect to the GIS Server [http://darcgis.water.ca.gov/arcgis](http://darcgis.water.ca.gov/arcgis) as a publisher and share your map as a service (choose cadre as the folder or make your own).

* Analyze your map, respond to errors/warnings, tweak your service properties (it's ok to accept the defaults), publish

* Your service will be at [https://darcgis.water.ca.gov/arcgis/rest/services/](https://darcgis.water.ca.gov/arcgis/rest/services/) in the folder you chose when publishing


###Create your Application
* Make a copy of **\\\\mrsbmapp21161\giswebapps\twopane** (or any template) and rename your folder (alternatively, clone the repository at [https://github.com/wpears/twopane](https://github.com/wpears/twopane))

* Examine your blank template at **http://darcgis.water.ca.gov/app/\[[your folder's name]]**

* Add your service as a layer in the app by locating the commented-out CheckLayer function call near the end of twopane.js and substituting your service's URL as the first argument

* Refresh your template page to examine your service


###Go Public
* Tell the rest of the ArcGIS Server cadre about your app and allow some time for them to review it (this will help make your app better).

* Check with your chain of command that your data is fit to go public.

* Contact DWR's Public Affairs Office, sending a link to your development app and informing them you have cadre and chain of command approval.

* Contact an admin (like me) saying you've done the last three steps and want to push your app to the public.

##Resources
#### Two-pane template
[https://github.com/wpears/twopane](https://github.com/wpears/twopane)

#### Basic template
[https://github.com/wpears/dwr-template](https://github.com/wpears/dwr-template)

#### Brownbag slides and files
[https://github.com/wpears/webmap-brownbag](https://github.com/wpears/webmap-brownbag)

#### ArcGIS Server Cadre Homepage
[https://dwrgis.water.ca.gov/arcgis\_server\_cadre](https://dwrgis.water.ca.gov/arcgis_server_cadre)

#### ArcGIS Server Cadre Documents
[https://dwrgis.water.ca.gov/library/-/document\_library/view/4691500](https://dwrgis.water.ca.gov/library/-/document_library/view/4691500)

#### ArcGIS Server Help
[http://resources.arcgis.com/en/help/main/10.2/index.html#//0154000002np000000](http://resources.arcgis.com/en/help/main/10.2/index.html#//0154000002np000000)

##Code Tutorials
####HTML and CSS
[http://www.codecademy.com/tracks/web](http://www.codecademy.com/tracks/web)

####Javascript
[http://eloquentjavascript.net/index.html](http://eloquentjavascript.net/index.html)

