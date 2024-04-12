import { RandomGenerator, TestValidator } from "@nestia/e2e";
import api from "kliber-api/lib/index";
import { IBbsArticle } from "kliber-api/lib/structures/bbs/IBbsArticle";
import typia from "typia";
import { v4 } from "uuid";

export async function test_api_bbs_article_create(
  connection: api.IConnection,
): Promise<void> {
  // STORE A NEW ARTICLE
  const stored: IBbsArticle = await api.functional.bbs.articles.create(
    connection,
    "general",
    {
      writer: RandomGenerator.name(),
      title: RandomGenerator.paragraph(3)(),
      body: RandomGenerator.content(8)()(),
      format: "txt",
      files: [
        {
          name: "logo",
          extension: "png",
          url: "https://somewhere.com/logo.png",
        },
      ],
      password: v4(),
    },
  );
  typia.assertEquals(stored);

  // READ THE DATA AGAIN
  const read: IBbsArticle = await api.functional.bbs.articles.at(
    connection,
    stored.section,
    stored.id,
  );
  typia.assertEquals(read);
  TestValidator.equals("created")(stored)(read);
}
