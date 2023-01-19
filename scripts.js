// Get references to the file input and upload button
const fileInput = document.getElementById("file-upload");
const uploadButton = document.getElementById("upload-button");
const downloadButton = document.getElementById("download-button");



// Add event listener to the upload button
uploadButton.addEventListener("click", function () {
    // Get the file from the input
    const file = fileInput.files[0];

    // Check that a file was selected
    if (!file) {
        alert("Please select a file to upload");
        return;
    }

    //save the file in the cache
    localStorage.setItem("xbcklFile", file);
    // Enable the download button
    downloadButton.disabled = false;
});

// Add event listener to the download button
downloadButton.addEventListener("click", function () {
    // Get the file from the cache
    const file = localStorage.getItem("xbcklFile");

    // Check that a file was uploaded
    if (!file) {
        alert("No file to download");
        return;
    }

    // Create a link to the file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
// Add event listener to the upload button
uploadButton.addEventListener("click", function () {
    // Get the file from the input
    const file = fileInput.files[0];

    // Check that a file was selected
    if (!file) {
        alert("Please select a file to upload");
        return;
    }
    //save the file in the cache
    localStorage.setItem("xbcklFile", file);
    // Enable the download button
    downloadButton.disabled = false;
    // Create a new FileReader
    const reader = new FileReader();

    // Add event listener to the FileReader
    reader.addEventListener("load", function () {
        // Get the contents of the file
        const contents = reader.result;

        // Parse the contents of the file
        const parser = new DOMParser();
        const xbcklDoc = parser.parseFromString(contents, "text/xml");

        // Get the table element
        const xbcklTable = document.getElementById("xbckl-table");

        // Get all the check elements
        const checks = xbcklDoc.getElementsByTagName("check");

        // Iterate through the check elements
        for (let i = 0; i < checks.length; i++) {
            // Get the current check element
            const check = checks[i];

            // Get the type, powersearch, searchmode, and description of the check
            const type = check.getAttribute("type");
            const powersearch = check.getAttribute("powersearch");
            const searchmode = check.getAttribute("searchmode");
            const description = check.getElementsByTagName("description")[0].textContent;

            // Create a new row for the table
            const row = xbcklTable.insertRow();

            // Insert the type, powersearch, searchmode, and description into the row
            const typeCell = row.insertCell();
            typeCell.innerHTML = type;
            const powersearchCell = row.insertCell();
            powersearchCell.innerHTML = powersearch;
            const searchmodeCell = row.insertCell();
            searchmodeCell.innerHTML = searchmode;
            const descriptionCell = row.insertCell();
            descriptionCell.innerHTML = description;
        }
    });

    // Read the contents of the file
    reader.readAsText(file);
});