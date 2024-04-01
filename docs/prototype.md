Static Interface Project
InterfacePrototype

1. Introduction
1.1 Tools Used - draw.io
The diagram was created using the free draw.io program. It has built-in elements useful for prototyping user interfaces such as buttons and charts.

1.2 Prototype Goals
The primary goal of creating the functional prototype was the need to plan the layout of user interface elements in the application window. The final interface did not come about immediately; its creation involved many "dirty" projects and discussions about the arrangement of individual elements. It was an iterative process.

1.3 Main Assumption of the Prototype Created
During the prototype creation, despite various early versions, we decided to try to create an interface similar to other known interfaces so that the future user could easily navigate our application. Additionally, we wanted to eliminate as many additional views as possible. Therefore, the entire interface was designed to minimize unnecessary add-ons. This way, we reduced the application interface to only one view.

2. Description of the Application Interface
2.1 Chart
The basic element of the application for creating charts is, of course, the chart itself. The chart changes its mode depending on the type of chart chosen by the user.

Directly above it is the chart title. It can be edited by clicking on the title, which will open it in edit mode.
Clicking directly on a point presented on the chart marks it with an arrow. The user will be prompted to enter a name for the arrow in a dialog box.
Beneath the chart is a legend that informs and identifies the datasets presented on the chart.
2.2 Table
Below the chart is a table made in the style familiar to the user from the Excel spreadsheet program. This table is the main control point for the application. The exact structure of the table was previously designed to allow the user direct access to many elements characterizing the data presented on the chart. It was also necessary to decide to always represent and store data in the form of points with x and y coordinates. This is the default mode for most available charts in the application: point, line, area, vertical bar, and horizontal bar. The exception is the pie chart, for which we decided to use only the x-coordinate of each point, omitting the y-coordinate. However, for the clarity of displaying data stored as points with two coordinates, we did not change the way the table is displayed. A detailed description of the table structure by rows:

Dataset Name - The first row consists of merged pairs of columns presenting dataset names. By editing cells, the user can change the dataset name.
Dataset Color Indicator - The second row also consists of merged cells similar to the first row. However, they contain rectangles serving as color indicators for the dataset. By clicking on a specific indicator, the user is presented with the default color selection palette. By selecting a color from the palette, the user changes the color of the dataset.
Ordering Labels - Cells containing the labels "x" and "y" respectively, which are points of reference for the user during data editing, are disabled from editing.
Point Coordinates - The lower rows of the table contain consecutive point coordinates, placed horizontally below the name of the dataset. The user can directly edit cells by editing values in the dataset.
Other equally important elements of the table are buttons for adding new datasets and buttons for adding new points to existing datasets. They are intuitively placed. The new dataset button is located in the middle of the table height to the right of it, and the new point addition button is in the middle of the table width below it. Clicking these buttons results in the creation of a completely new empty dataset that appears to the right of existing datasets for the new dataset button and the addition of empty cells representing the coordinates of the new point to each dataset for the new point addition button.
2.3 Sidebar
On the left side of the interface is a sidebar containing the remaining interface elements. Starting from the top at the same height, there are Undo and Redo buttons. They allow undoing and redoing application actions. Below them are the "Import Data" and "Export Data" buttons. Clicking "Import Data" presents the user with a system file selection window. This way, it is possible to load data from a CSV file into the application. Clicking the "Export Data" button immediately initiates data downloading from the application in CSV file format. Below is a matrix of six large square buttons allowing selection of the chart type.

2.4 Appbar
The interface is topped by a bar placed above the other elements. On the left side, it displays the application name.
