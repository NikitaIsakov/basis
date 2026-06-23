import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AuthorProfile } from '../model/types';
import * as authorApi from './authorApi';

export const authorRtkApi = createApi({
  reducerPath: 'authorRtkApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Author'],
  endpoints: (builder) => ({
    getAuthor: builder.query<AuthorProfile | undefined, string>({
      async queryFn(id) {
        try {
          const data = await authorApi.fetchAuthorById(id);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (_r, _e, id) => [{ type: 'Author', id }],
    }),
  }),
});

export const { useGetAuthorQuery } = authorRtkApi;
