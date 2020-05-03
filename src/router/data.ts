import {Router, Request, Response, NextFunction} from 'express';

import Article from '../models/Article';

const router = Router();

router.get('/top-tags', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tags = [
			'development',
			'news',
			'events',
			'article',
			'buissness',
			'success',
			'john wick',
			'call of duty',
			'assassins creed',
			'the witcher',
			'gerland',
			'pravns'
		];

		res.json({tags});
	} catch (err) {
		next(err);
	}
});

router.get('/top-articles', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const articles = await Article.find().limit(5);

		res.json({articles});
	} catch (err) {
		next(err);
	}
});

router.get('/statistics/articles', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const articles = await Article.find()
			.sort({views: -1})
			.limit(10)
			.populate('comments')
			.populate('category');

		const data = {
			labels: articles.map(article => {
				if (article.title.length > 10) {
					return `${article.title.slice(0, 10)}...`;
				}

				return article.title;
			}),
			views: articles.map(article => article.views),
			comments: articles.map(article => article.comments.length)
		};

		res.json({data});
	} catch (err) {
		next(err);
	}
});

export default router;