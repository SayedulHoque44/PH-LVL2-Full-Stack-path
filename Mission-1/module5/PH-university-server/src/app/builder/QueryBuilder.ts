import { FilterQuery, Query } from "mongoose";

// http://localhost:3000/api/v1/students?email=me02Autum2023.dsd@example.com
// http://localhost:3000/api/v1/students?page=1&limit=2
// http://localhost:3000/api/v1/students?sort=-createdAt
// http://localhost:3000/api/v1/students?searchTerm=sayed

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  //searching
  search(searchAbleField: string[]) {
    const searchTerm = this.query?.searchTerm;
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleField.map(
          (field: string) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" }, //email:{$regex:'rav',$options:i}
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  //filtering
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach(ele => delete queryObj[ele]);

    this.modelQuery = this?.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }
  // sorting
  sort() {
    const sort = this?.query?.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }
  //
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;

    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
  //
  fields() {
    const listedFields =
      (this.query.fields as string)?.split(",").join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(listedFields);

    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
