const {gql} = require('apollo-server');

module.exports = gql`
	scalar DateTime
	scalar Email
	scalar URL
	scalar LimitString
	scalar Password

	input AddArticleInput {
		title: String!
		text: String!
		image: String!
	}

	input EditArticleInput {
		articleId: ID!
		title: String
		text: String
		views: Int
	}

	type Article {
		_id: ID!
		title: String!
		text: String!
		views: Int!
		image: String!
		created_at: DateTime!
	}

	type Query {
		totalArticles: Int!
		articles(first: Int = 10): [Article!]!
		article(articleId: ID!): Article!
	}

	type Mutation {
		addArticle(input: AddArticleInput!): Article!
		editArticle(input: EditArticleInput!): Article!
		removeArticle(articleId: ID!): Article!
	}
`;