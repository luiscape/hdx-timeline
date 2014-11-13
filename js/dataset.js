// to find completed tasks we
// are building an SQL statement that
// uses the ids collected from the
// Google Spreadsheet
d3.json('https://data.hdx.rwlabs.org/api/action/recently_changed_packages_activity_list?limit=100', function(error, json) {
    if (error) return ('Error, my friend:' + error);
    data = json;

    // parsing json
    var package_activity_list = jsonPath.eval(data, '$.result');

    // variable for container
    var containerBegin = '<div class="cd-timeline-block">';
    var containerEnd = '</div>';
    var timelineContainerBegin = '<div class="cd-timeline-content">';
    var timelineContainerEnd = '</div>';


    // iterating over the id list and creating
    // a box in the html canvas
    for (i = 0; i < package_activity_list[0].length; i++) {

    // function for selecting the image
    // container. depending on the type of
    // change, the image changes.
    function selectImage(a) {
      // todo: change colors
      if (a == 'edit') {
        image = 'edit.svg';
      }
      else if (a == 'delete') {
        image = 'delete.svg';
      }
      else image = 'upload.svg';
      imageContainer = '<div class="cd-timeline-img cd-picture"><img src="img/' + image + '" alt="Picture"></div>';
      return(imageContainer);
    }

    selectImage('edit');

    // dataset name
    var packageName = package_activity_list[0][i].data.package.title;
    var packageNameContainer = '<h2>' + packageName + '</h2>';

    // dataset description
    var packageDescription = package_activity_list[0][i].data.package.notes;
    var pacakageDescriptionContainer = '<p>' + packageDescription + '</p>';

    // dataset link
    var packageLink = 'http://data.hdx.rwlabs.org/dataset/' + package_activity_list[0][i].data.package.name;
    var packageLinkContainer = '<a href="' + packageLink + '" class="cd-read-more">Read more</a>';

    // change timespan
    t = Date.parse(package_activity_list[0][i].data.package.metadata_modified);
    var timeSpan = new Date(t);
    var timeSpanContainer = '<span class="cd-date">' + timeSpan + '</span>';



     // variable with the document title
     // var truncatedName = docName[i].substring(0,33);
     // var title = '<p>' + '<strong>Title: </strong>' + truncatedName + ' (...)</p>';

     // variable with the document type
     // var type = '<p>' + '<span class="fui-info-circle"></span> ' + docType[i] + '</p>';

     // varibale with the document id
     // var id = '<p style="font-size: 18px;">Document code: ' + '<strong>'+ capID[i] + '</strong>' + '</p>';

     // input data
     // var linkInput = '<a class="btn btn-primary btn-large btn-block" style="background-color: #f2645a;" href="https://docs.google.com/forms/d/1nqzDD2if5-qlz0wApx0gds1tHm_Pqev2lwrvI3Xu0Kk/viewform" target="_blank"><span class="fui-check"></span> Input Data</a>';

     // generating the cards
    var doc = document.getElementById('cd-timeline');
    doc.innerHTML += containerBegin + imageContainer + timelineContainerBegin + packageNameContainer + pacakageDescriptionContainer + timeSpanContainer + packageLinkContainer + timelineContainerEnd + containerEnd;
  };
});
