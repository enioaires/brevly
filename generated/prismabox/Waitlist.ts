import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const WaitlistPlain = t.Object(
  {
    id: t.String(),
    email: t.String(),
    projectDetails: t.String(),
    phoneNumber: __nullable__(t.String()),
    companyName: __nullable__(t.String()),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const WaitlistRelations = t.Object({}, { additionalProperties: false });

export const WaitlistPlainInputCreate = t.Object(
  {
    email: t.String(),
    projectDetails: t.String(),
    phoneNumber: t.Optional(__nullable__(t.String())),
    companyName: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const WaitlistPlainInputUpdate = t.Object(
  {
    email: t.Optional(t.String()),
    projectDetails: t.Optional(t.String()),
    phoneNumber: t.Optional(__nullable__(t.String())),
    companyName: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const WaitlistRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const WaitlistRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const WaitlistWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          email: t.String(),
          projectDetails: t.String(),
          phoneNumber: t.String(),
          companyName: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Waitlist" },
  ),
);

export const WaitlistWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), email: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ email: t.String() })],
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
              email: t.String(),
              projectDetails: t.String(),
              phoneNumber: t.String(),
              companyName: t.String(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Waitlist" },
);

export const WaitlistSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      email: t.Boolean(),
      projectDetails: t.Boolean(),
      phoneNumber: t.Boolean(),
      companyName: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const WaitlistInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const WaitlistOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      projectDetails: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      phoneNumber: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      companyName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Waitlist = t.Composite([WaitlistPlain, WaitlistRelations], {
  additionalProperties: false,
});

export const WaitlistInputCreate = t.Composite(
  [WaitlistPlainInputCreate, WaitlistRelationsInputCreate],
  { additionalProperties: false },
);

export const WaitlistInputUpdate = t.Composite(
  [WaitlistPlainInputUpdate, WaitlistRelationsInputUpdate],
  { additionalProperties: false },
);
