import { Prisma } from "@prisma/client";

export function buildWhere(condition: string): Prisma.UsersWhereInput {
  const parseCondition = (cond: string): Prisma.UsersWhereInput => {
    const regex = /(\d+)\s*([<>]=?)\s*(\w+)\s*([<>]=?)\s*(\d+)/;
    const match = cond.match(regex);

    if (match) {
      const [, lowerValue, lowerOperator, field, upperOperator, upperValue] =
        match;
      return {
        [field]: {
          [lowerOperator === "<" ? "gt" : "gte"]: parseFloat(lowerValue),
          [upperOperator === "<" ? "lt" : "lte"]: parseFloat(upperValue),
        },
      };
    }

    const [field, operator, ...rest] = cond.split(/([=!<>]=?)/);
    const value = rest.join(" ").replace(/['"]/g, "").trim();

    switch (operator) {
      case "=":
        return { [field.trim()]: value };
      case "!=":
        return { [field.trim()]: { not: value } };
      case ">":
        return { [field.trim()]: { gt: parseFloat(value) } };
      case ">=":
        return { [field.trim()]: { gte: parseFloat(value) } };
      case "<":
        return { [field.trim()]: { lt: parseFloat(value) } };
      case "<=":
        return { [field.trim()]: { lte: parseFloat(value) } };
      case "IN":
        return {
          [field.trim()]: {
            in: value
              .replace(/[()]/g, "")
              .split(",")
              .map((v) => v.trim()),
          },
        };
      case "NOT IN":
        return {
          [field.trim()]: {
            notIn: value
              .replace(/[()]/g, "")
              .split(",")
              .map((v) => v.trim()),
          },
        };
      case "LIKE":
        return { [field.trim()]: { contains: value.replace(/[%]/g, "") } };
      case "HAS":
        return { [field.trim()]: { has: value } };
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  };

  const handleComplexCondition = (cond: string): Prisma.UsersWhereInput => {
    if (cond.startsWith("(") && cond.endsWith(")")) {
      cond = cond.slice(1, -1);
    }

    const andConditions = cond.split("&&").map((c) => c.trim());
    const andArray: Prisma.UsersWhereInput[] = [];

    andConditions.forEach((andCond) => {
      const orConditions = andCond.split("||").map((c) => c.trim());
      const orArray: Prisma.UsersWhereInput[] = [];

      orConditions.forEach((orCond) => {
        if (orCond.includes("(") && orCond.includes(")")) {
          orArray.push(handleComplexCondition(orCond));
        } else {
          orArray.push(parseCondition(orCond));
        }
      });

      if (orArray.length > 1) {
        andArray.push({ OR: orArray });
      } else {
        andArray.push(orArray[0]);
      }
    });

    if (andArray.length > 1) {
      return { AND: andArray };
    } else {
      return andArray[0];
    }
  };

  const conditions = condition.split("&&").map((c) => c.trim());
  const whereObject: Prisma.UsersWhereInput | any =
    conditions.length > 1 ? { AND: [] } : {};

  conditions.forEach((cond) => {
    if (cond.startsWith("!")) {
      const innerCondition = cond.slice(1).trim();
      if (conditions.length > 1) {
        whereObject.AND.push({ NOT: handleComplexCondition(innerCondition) });
      } else {
        Object.assign(whereObject, {
          NOT: handleComplexCondition(innerCondition),
        });
      }
    } else {
      if (conditions.length > 1) {
        whereObject.AND.push(handleComplexCondition(cond));
      } else {
        Object.assign(whereObject, handleComplexCondition(cond));
      }
    }
  });

  return whereObject;
}
