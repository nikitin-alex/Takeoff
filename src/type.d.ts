interface IArticle {
  id: number;
  title: string;
  body: string;
}

type ArticleState = IArticle[];

type ArticleAction = {
  type: string;
  article: IArticle;
};

type DispatchType = (args: ArticleAction) => ArticleAction;