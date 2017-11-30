(function()
{
    var config = 
    {
        apiKey: "AIzaSyByPvg1_iTX2XGxIJ7URgrKKmqCU-pL4lQ",
        authDomain: "cs4830final-cd342.firebaseapp.com",
        databaseURL: "https://cs4830final-cd342.firebaseio.com",
        projectId: "cs4830final-cd342",
        storageBucket: "cs4830final-cd342.appspot.com",
        messagingSenderId: "27905852925"
    };
    firebase.initializeApp(config);

//For Create Profile Page
var txtEmail = document.getElementById('txt-email');
var txtPassword = document.getElementById('txt-password');
var btnLogin = document.getElementById('btn-login');
var btnSignUp = document.getElementById('btn-signup');
var btnLogOut = document.getElementById('btn-logout');
            
btnLogin.addEventListener('click', e =>
{
    var username = txtEmail.value;
    var password = txtPassword.value;
    var auth = firebase.auth();
    var promise = auth.signInWithEmailAndPassword(username, password);
    promise.catch(e => console.log(e.message));
});
            
btnSignUp.addEventListener('click', e => 
{
    var username = txtEmail.value;
    var password = txtPassword.value;
    var auth = firebase.auth();
    var promise = auth.createUserWithEmailAndPassword(username, password);
    promise.catch(e => console.log(e.message));
});
            
btnLogOut.addEventListener('click', e =>
{
    firebase.auth().signOut();     
});
            
firebase.auth().onAuthStateChanged(firebaseUser =>
{
    if(firebaseUser)
    {
        console.log('logged in');
        btnLogOut.classList.remove('hide');      
    }
    else
    {
        console.log('not logged in');
        btnLogOut.classList.add('hide');
    }
});
//end create profile page
    
//MakeBlog Page
firebase.auth().onAuthStateChanged(firebaseUser =>
{
    if(firebaseUser)
    {
        //Source for getting date: https://docs.microsoft.com/en-us/scripting/javascript/calculating-dates-and-times-javascript
        var dt = new Date();  
                     
        var month = dt.getMonth()+1;  
        var day = dt.getDate();  
        var year = dt.getFullYear();  
        var date = (month + '-' + day + '-' + year);
                    
        var title = document.getElementById('blogTitle');
        var content = document.getElementById('newBlog');
        var comments = null;
            
        var blogs = firebase.database().ref().child('blogs');
                    
        $('#submit').click(function()
        {
            var newPost = blogs.push(
            {
                blogName: $('#blogTitle').val(),
                content: $('#newBlog').val(),
                date: date
            });
            var postID = newPost.key;
        });
    }
    else
    {
                    
    }
});
    
//ThreadPage
function assign(loggedIn, blogName, userName, date, content,  comments) 
{
    var blogPost = 
    {
        loggedIn: loggedIn,
        blogName: blogName,
        blogger: userName,
        date: date,
        content: content,
        userName: userName,
        comments:
        [
            {
                commenter: "User 1",
                postDate: "November 26, 2017",
                postTime: "11:00 PM",
                message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel bibendum tellus, sit amet convallis lectus. Curabitur mi turpis, suscipit id quam feugiat, porta lobortis arcu. Aenean et varius augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },
            {
                commenter: "User 2",
                postDate: "November 26, 2017",
                postTime: "11:10 PM",
                message: "Etiam quis enim vel ipsum suscipit mollis. Nulla laoreet arcu vitae condimentum pellentesque. Cras feugiat orci in tincidunt varius. Mauris quis magn ultricies, porta odio quis, varius arcu."
            },
            {
                commenter: "User 3",
                postDate: "November 26, 2017",
                postTime: "11:20 PM",
                message: "Sed eget egestas quam. Donec a vehicula elit, in auctor neque. Sed ultrices vulputate mauris, at gravida dui malesuada at. Phasellus dapibus efficitur lobortis. Praesent eget sapien ultricies, ultrices mauris vitae, tristique ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris eu erat enim. Fusce vulputate scelerisque risus eu vehicula."
            },
        ],
    }; 
    var template = document.getElementById("template");
    var hash = blogPost;
        
    var output = Mustache.render(template.innerHTML, hash);
        
    var display = document.getElementById("display");
    display.innerHTML = output;
}
    
function getBlog()
{
                
}
//end of ThreadPage
}());