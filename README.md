# [UA Scraper](https://ua-scraper.herokuapp.com/)

This web application scrapes articles from the Unearthed Arcana tag from D&D, and saves non-duplicates into the database.

The landing page displays every article previously saved, each with its title, a short description, and a link to the original article at the D&D website, a link to the pdf download, and a button to display the comments for that article.

![articles](https://evolatum.github.io/Portfolio/assets/images/ua-scraper-article.PNG)

When clicking the comments button in an article, a bubble appears on its right side that allows users to add new comments, each with a title and text, and see previously added comments. Each of the saved comments can be deleted by clicking in the cross at the top right of the comment.

![comments](https://evolatum.github.io/Portfolio/assets/images/ua-scraper-comment.PNG)


The app was developed using Cheerio to scrape the articles, and mongoose to save the links and information to a MongoDB database. The comments and articles are in different schemas, and each comment can reference multiple comments. When a comment is deleted both the reference and the comment itself are deleted.
