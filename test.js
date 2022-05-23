let finalProfile = {};
document.getElementById("test").addEventListener('click', () => {
  console.log("Popup DOM fully loaded and parsed");

  function modifyDOM() {
    //You can play with your DOM here or check URL against your regex
    console.log('Tab script:');
    // console.log(document.body);                   body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(3) > font
    const surname = document.querySelector('body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(3) > font')?.innerHTML;
    console.log('Surame: ', surname);
    const queries = [
      {key: 'id', displayText: 'Id', querySelector: 'body > table:nth-child(4) > tbody > tr > td > p > b > font'},
      {key: 'name', displayText: 'Name', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(2) > font'},
      {key: 'surname', displayText: 'Surname', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(3) > font'},
      {key: 'age', displayText: 'Age', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(4) > td:nth-child(2) > font'},
      {key: 'height', displayText: 'Height', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(5) > td:nth-child(2) > font'},
      {key: 'weight', displayText: 'Weight', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(6) > td:nth-child(2) > font'},
      {key: 'qualification', displayText: 'Qualification', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(7) > td:nth-child(2) > font'},
      {key: 'occupation', displayText: 'Occupation', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(8) > td:nth-child(2) > font'},
      {key: 'native', displayText: 'Native', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(5) > font'},
      {key: 'father', displayText: 'Father', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(4) > font'},
      {key: 'fatherOccupation', displayText: 'Father\'s Occupation' , querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(4) > td:nth-child(4) > font'},
      {key: 'mother', displayText: 'Mother', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(5) > td:nth-child(4) > font'},
      {key: 'motherOccupation', displayText: 'Mother\'s Occupation', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(6) > td:nth-child(4) > font'},
      {key: 'brothers', displayText: 'Brothers', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(7) > td:nth-child(4) > font'},
      {key: 'sisters', displayText: 'Sisters', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(8) > td:nth-child(4) > font'},
      {key: 'familyIncome', displayText: 'Family Income', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(9) > td:nth-child(3) > font'},
      {key: 'personalIncome', displayText: 'Personal Income', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(9) > td:nth-child(5) > font'},
      {key: 'birthDate', displayText: 'Birth Date', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(11) > td:nth-child(1) > font'},
      {key: 'birthTime', displayText: 'Birth Time', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(11) > td:nth-child(2) > font'},
      {key: 'birthPlace', displayText: 'Birth Place', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(11) > td:nth-child(3) > font'},
      {key: 'specs', displayText: 'Specs', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(12) > td:nth-child(1) > font'},
      {key: 'mangalShani', displayText: 'Mangal/Shani?', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(12) > td:nth-child(2) > font'},
      {key: 'aboutMe', displayText: 'About Me', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(13) > td:nth-child(2) > p > font'},
      {key: 'imageUrl', displayText: 'Image Url', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(1) > img', processValue: qs => qs && document.querySelector(qs)?.innerHTML },

    ]
    // const extraDetails =
    // const finalJson = {
    //   candidate: {
    //     name: '',
    //     surname: '',
    //     age: '',
    //     height: '',
    //     weight: '',
    //     qualification: '',
    //     occupation: '',
    //     birthDate: '',
    //     birthTime: '',
    //     birthPlace: '',
    //   },
    //   family: {
    //     native: '',
    //     father: '',
    //     fatherOccupation: '',
    //     mother: '',
    //     motherOccupation: '',
    //     brothers: '',
    //     sisters: '',
    //   },
    //   extraDetails: {
    //
    //   }
    // }
    let tableBody = '';
    const finalJson = queries.map(detail => {
      const {key, querySelector: qs, displayText, processValue } = detail;
      // qs && console.log(`${key}: `,  document.querySelector(qs));
      let value = qs && document.querySelector(qs)?.innerHTML;
      if (processValue) value = processValue(qs);
      const returnVal = {key, value, displayText};
      if(qs) tableBody += `<tr><td>${displayText}</td><td>${returnVal.value}</td></tr>`;
      return returnVal;
    });
    const tableNode = document.getElementById('dataTable');
    // console.log('TableNode: ', tableNode)
    // tableNode.innerHTML = tableBody;
    console.log('FinalJson: ', JSON.stringify(finalJson)) ;
    return finalJson;
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript({
    code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
    //Here we have just the innerHTML and not DOM structure
    console.log('Popup script:')
    //alert(results[0].length);
    // alert('Doc ? '  + document.getElementById('dataTable').outerHTML);
    const tableNode = document.getElementById('dataTable');
    let tableBody = '';
    results[0].map(({key, value, displayText}) => {
      finalProfile[key] = value;
      tableBody += `<tr><td>${displayText}:</td><td>${value}</td></tr>`;
    });
    tableBody += `<tr><td id="status">Status</td><td id="status1">Status 1</td></tr>`;
    tableNode.innerHTML = tableBody;
    document.getElementById('saveBtn').style.display = 'inherit';
    // alert('TableNode: ' + tableBody);
  });
});
document.getElementById("saveBtn").addEventListener('click', () => {
  function modifyStatus() {}
  function makeApiCall(method = 'GET', url = 'https://save-my-links.herokuapp.com/api/bookmark', data = null) {
    // 1. Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    // 3. Send the request over the network
    xhr.send(data ? JSON.stringify(data) : data);

    // 4. This will be called after the response is received
    xhr.onload = function() {
      if (xhr.status != 200) { // analyze HTTP status of the response
        document.getElementById('status').style.background = 'gray';
        document.getElementById('status').innerHTML = 'Starting request';
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        let responseKeys = xhr.response;
        document.getElementById('status').style.background = 'green';
        document.getElementById('status').innerHTML = responseKeys;
        alert(`Response: ${responseKeys}`); // response is the server response
        console.log('===> Api Response: ', xhr.response);
      }
    };
    //
    // xhr.onprogress = function(event) {
    //   if (event.lengthComputable) {
    //     alert(`Received ${event.loaded} of ${event.total} bytes`);
    //   } else {
    //     alert(`Received ${event.loaded} bytes`); // no Content-Length
    //   }
    //
    // };

    xhr.onerror = function() {
      document.getElementById('status').innerHTML = 'Req failed';
      document.getElementById('status').style.background = 'red';
      alert("Request failed");
    };
  }
  chrome.tabs.executeScript({
    code: '(' + modifyStatus + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
    //Here we have just the innerHTML and not DOM structure

    document.getElementById('status').style.background = 'gray';
    document.getElementById('status').innerHTML = `Starting request: ${finalProfile || 'No profile data'}` ;
    makeApiCall('POST', 'http://localhost:8085/api/p-club/profile', finalProfile || {profile:'No profile Data'});
    document.getElementById('status1').style.background = 'red'
  });
})

