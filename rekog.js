<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaf Disease Identification</title>
</head>
<body>

    <h2>Leaf Disease Identification</h2>
    
    <!-- Input for uploading an image -->
    <input type="file" id="imageInput" accept="image/*">
    
    <!-- Button to trigger Rekognition analysis -->
    <button onclick="analyzeImage()">Analyze Image</button>

    <!-- Display results -->
    <div id="results"></div>

    <!-- AWS SDK for JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aws-sdk/2.1083.0/aws-sdk.min.js"></script>

    <!-- JavaScript for Rekognition integration -->
    <script>
        // Configure AWS credentials
        AWS.config.update({
            accessKeyId: 'YOUR_ACCESS_KEY',
            secretAccessKey: 'YOUR_SECRET_KEY',
            region: 'YOUR_REGION',
        });

        // Function to analyze the uploaded image
        function analyzeImage() {
            // Get the selected image file
            var fileInput = document.getElementById('imageInput');
            var file = fileInput.files[0];

            // Perform Rekognition API call
            var rekognition = new AWS.Rekognition();
            var params = {
                ProjectVersionArn: 'YOUR_PROJECT_VERSION_ARN',
                Image: {
                    Bytes: file,
                },
            };

            rekognition.detectCustomLabels(params, function(err, data) {
                if (err) {
                    console.log('Error:', err);
                    document.getElementById('results').innerText = 'Error analyzing image.';
                } else {
                    console.log('Rekognition Response:', data);
                    displayResults(data.CustomLabels);
                }
            });
        }

        // Function to display results on the webpage
        function displayResults(results) {
            var resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<h3>Results:</h3>';
            
            // Display each detected label
            results.forEach(function(label) {
                resultsDiv.innerHTML += `<p>${label.Name}: ${label.Confidence.toFixed(2)}%</p>`;
            });
        }
    </script>
</body>
</html>
