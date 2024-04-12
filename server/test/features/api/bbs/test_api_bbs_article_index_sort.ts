import {
  ArrayUtil,
  GaffComparator,
  RandomGenerator,
  TestValidator,
} from "@nestia/e2e";
import api from "kliber-api/lib/index";
import { IBbsArticle } from "kliber-api/lib/structures/bbs/IBbsArticle";
import { IPage } from "kliber-api/lib/structures/common/IPage";
import typia from "typia";

export async function test_api_bbs_article_index_sort(
  connection: api.IConnection,
): Promise<void> {
  // GENERATE 100 ARTICLES
  const section: string = "general";
  const articles: IBbsArticle[] = await ArrayUtil.asyncRepeat(100)(() =>
    api.functional.bbs.articles.create(connection, section, {
      writer: RandomGenerator.name(),
      title: RandomGenerator.paragraph(5)(),
      body: RandomGenerator.content(8)()(),
      format: "txt",
      files: [],
      password: RandomGenerator.alphabets(8),
    }),
  );
  typia.assertEquals(articles);

  // PREPARE VALIDATOR
  const validator = TestValidator.sort("BbsArticleProvider.index()")(async (
    sort: IPage.Sort<IBbsArticle.IRequest.SortableColumns>,
  ) => {
    const page: IPage<IBbsArticle.ISummary> =
      await api.functional.bbs.articles.index(connection, section, {
        limit: 100,
        sort,
      });
    return typia.assertEquals(page).data;
  });

  // DO VALIDATE
  const components = [
    validator("created_at")(GaffComparator.dates((x) => x.created_at)),
    validator("updated_at")(GaffComparator.dates((x) => x.updated_at)),
    validator("title")(GaffComparator.strings((x) => x.title)),
    validator("writer")(GaffComparator.strings((x) => x.writer)),
    validator(
      "writer",
      "title",
    )(GaffComparator.strings((x) => [x.writer, x.title])),
  ];
  for (const comp of components) {
    await comp("+", false);
    await comp("-", false);
  }
}