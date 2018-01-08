import dotenv from 'dotenv';
import querystring from 'querystring';
dotenv.config();
export const API_KEY = process.env.NEW_YORK_TIMES_API_KEY;
export const SCHEMA = {
  api: {
    type: 'string',
    oneOf: [
      'archive',
      'article-search',
      'books',
      'community',
      'geo',
      'most-popular',
      'movie-reviews',
      'semantic',
      'timeswire',
      'times-tags',
      'top-stories'
    ]
  }
};

export const ARCHIVE_PARAMS = {
  year: {
    type: 'string',
    format: 'YYYY'
  },
  month: {
    type: 'number',
    format: 'MM',
    oneOf: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }
};

export const ARTICLE_SEARCH_PARAMS = {
  q: {
    type: 'string',
    format: 'query',
    example: 'tax plan'
  },
  fq: {
    type: 'string',
    format: 'filtered query',
    example: 'tax plan'
  }
};

export const BOOKS_PARAMS = {
  endpoint: {
    type: 'string',
    oneOf: [
      {
        name: 'lists',
        description: 'Best Seller list',
        params: {
          list: {
            type: 'string',
            description: `The name of the Times best-seller list. To get valid values, use a list names request.
            Be sure to replace spaces with hyphens (e.g., e-book-fiction or hardcover-fiction, not E-Book Fiction or Hardcover Fiction).
            (The parameter is not case sensitive.)
            `
          },
          'weeks-on-list': {
            type: 'integer',
            description: `The number of weeks that the best seller has been on list-name, as of bestsellers-date`
          },
          'bestsellers-date': {
            type: 'date',
            format: 'YYYY-MM-DD',
            description: `The week-ending date for the sales reflected on list-name. 
            Times best-seller lists are compiled using available book sale data. 
            The bestsellers-date may be significantly earlier than published-date. 
            For additional information, see the explanation at the bottom of any best-seller list page on NYTimes.com 
            (example: Hardcover Fiction, published Dec. 5 but reflecting sales to Nov. 29).`
          },
          date: {
            type: 'date',
            format: 'YYYY-MM-DD',
            description: `The date the best-seller list was published on NYTimes.com (compare bestsellers-date)`
          },
          isbn: {
            type: 'string',
            description: `International Standard Book Number, 10 or 13 digits`
          },
          'published-date': {
            type: 'date',
            description: `The date the best-seller list was published on NYTimes.com (compare bestsellers-date)`
          },
          rank: {
            type: 'integer',
            description: `The rank of the best seller on list-name as of bestsellers-date`
          },
          'rank-last-week': {
            type: 'integer',
            description: `The rank of the best seller on list-name one week prior to bestsellers-date`
          },
          offset: {
            type: 'integer',
            description: `Sets the starting point of the result set`
          },
          'sort-order': {
            type: 'string',
            description: `Sets the sort order of the result set

            Allowed values are:
            
                ASC
                DESC`
          }
        }
      },
      {
        name: 'history',
        description: 'Best Seller History list'
      },
      {
        name: 'names',
        description: 'Best Seller list names'
      },
      {
        name: 'overview',
        description: 'Best Seller list overview'
      },
      {
        name: 'date',
        description: 'Best Seller List by date'
      },
      {
        name: 'reviews',
        description: 'Reviews'
      }
    ]
  }
};

export const API_URLS = {
  archive: ({ month, year, ...apiKey }) => {
    if (!month || !year)
      throw new Error(`'month' and 'year' must be specified for this api`);
    return () =>
      `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?${querystring.stringify(
        apiKey
      )}`;
  },
  'article-search': params =>
    `https://api.nytimes.com/svc/search/v2/articlesearch.json${
      params ? `?${querystring.stringify(params)}` : ``
    }`
};

export default API_KEY;
