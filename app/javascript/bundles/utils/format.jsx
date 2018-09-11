import moment from 'moment';

export const formatDate = (d) => {
  return moment(d).format('MMMM DD YYYY, h:mm:ss a')
}
