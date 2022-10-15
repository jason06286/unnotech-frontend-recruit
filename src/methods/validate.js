import * as Yup from 'yup';

const bookSchema = Yup.object().shape({
  title: Yup.string().required('書名不得為空，請重新輸入'),
  author: Yup.string().required('作者不得為空，請重新輸入'),
});

export { bookSchema };
