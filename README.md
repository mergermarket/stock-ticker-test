Coding Assignment
=================

### What we're looking for

* A working web app
* Clean, maintainable code
* Tests
* Pragmatism over perfection

This is a simulation of a real day at work. You're pairing with a colleague, you've got senior people around, you have a Product Owner who is your customer at this point.

Feel free to look up stuff on the Internet, take breaks, ask us questions. Just as you would in real life.

## Objective

Create a web application to display the following information about a company:

- Company name
- Stock ticker code
- Stock price
- The two most recent news stories
- The sentiment (positive, negative or neutral) of each news story

We have created some APIs to help you with the task, but you will need to write code that calculates the sentiment based on the rules in this document.

### UI

The application should display the information in a 'card' format. The design is up to you but the card should roughly look like this:

![example](http://i.imgur.com/hcSubsi.jpg)

This is only a guide. Feel free to deviate from the mockup (please!) as long as you present the information in a user-friendly way.

### Data

#### Ticker code lookup

There is a MongoDB database that contains company names and ticker codes.

`mongodb://mm_recruitment_user_readonly:rebelMutualWhistle@ds037551.mongolab.com:37551/mm-recruitment`

The ticker code lookup collection is called `company`

#### Stock price
The stock price is available as a JSON document at:

`http://mm-recruitment-stock-price-api.herokuapp.com/company/{company_ticker_code}`

For example, a call to `http://mm-recruitment-stock-price-api.herokuapp.com/company/GOOG`
might return

```json
{
   "tickerCode": "GOOG",
   "latestPrice": 54407,
   "priceUnits": "GBP:pence",
   "asOf": "2015-05-06T15:05:59.912Z",
   "storyFeedUrl": "http://mm-recruitment-story-feed-api.herokuapp.com/8271"
}
```

#### News feed
The stock price response contains a link to the story feed for that company, follow the link to get back a JSON document of news stories.

For example, a call to `http://mm-recruitment-story-feed-api.herokuapp.com/8271` might return

```json
[
	{
		"id": 1,
		"headline": "Make up a headline",
		"body": "Body with enough words to trigger sentiment analysis"
	},
	{
		"id": 2,
		"headline": "Make up a headline",
		"body": "Body with enough words to trigger sentiment analysis"
	}
]
```

### Story sentiment analysis
Each story should be assigned a positivity score - its formula is:

`positivity = positive_word_count - negative_word_count`

- `positive_word_count` is the number of times a positive word appears in the article body
- `negative_word_count` is the number of times a negative word appears in the article body
- If the value of `positivity` is less than 2, the sentiment analysis is *neutral*.
- If `positivity` is positive, the sentiment analysis is *positive*.
- If `positivity` is negative, the sentiment analysis is *negative*.

Positive words: positive, success, grow, gains, happy, healthy

Negative words: disappointing, concerns, decline, drag, slump, feared

Calculate each story's sentiment analysis and display it next to the story headline in the card.