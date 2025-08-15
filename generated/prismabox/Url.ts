import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UrlPlain = t.Object(
  {
    id: t.String(),
    shortId: t.String(),
    originalUrl: t.String(),
    createdAt: t.Date(),
    clicks: t.Integer(),
    createdBy: t.String(),
  },
  { additionalProperties: false },
);

export const UrlRelations = t.Object({}, { additionalProperties: false });

export const UrlPlainInputCreate = t.Object(
  {
    originalUrl: t.String(),
    clicks: t.Optional(t.Integer()),
    createdBy: t.String(),
  },
  { additionalProperties: false },
);

export const UrlPlainInputUpdate = t.Object(
  {
    originalUrl: t.Optional(t.String()),
    clicks: t.Optional(t.Integer()),
    createdBy: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const UrlRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const UrlRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const UrlWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          shortId: t.String(),
          originalUrl: t.String(),
          createdAt: t.Date(),
          clicks: t.Integer(),
          createdBy: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Url" },
  ),
);

export const UrlWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), shortId: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ shortId: t.String() })],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              shortId: t.String(),
              originalUrl: t.String(),
              createdAt: t.Date(),
              clicks: t.Integer(),
              createdBy: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Url" },
);

export const UrlSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      shortId: t.Boolean(),
      originalUrl: t.Boolean(),
      createdAt: t.Boolean(),
      clicks: t.Boolean(),
      createdBy: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UrlInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const UrlOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      shortId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      originalUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      clicks: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdBy: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Url = t.Composite([UrlPlain, UrlRelations], {
  additionalProperties: false,
});

export const UrlInputCreate = t.Composite(
  [UrlPlainInputCreate, UrlRelationsInputCreate],
  { additionalProperties: false },
);

export const UrlInputUpdate = t.Composite(
  [UrlPlainInputUpdate, UrlRelationsInputUpdate],
  { additionalProperties: false },
);
