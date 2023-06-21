import moment from "moment";

export const changeDate = (value) => {
  let daysDiff = moment().diff(value, "days");

  if (daysDiff <= 3) {
    moment.locale("vi");
    return moment(value).fromNow();
  } else {
    return moment(value).format("L");
  }
};
