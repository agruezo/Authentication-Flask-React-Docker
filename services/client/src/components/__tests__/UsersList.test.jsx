import React from 'react';
import { render, cleanup } from '@testing-library/react';

import UsersList from '../UsersList';

afterEach(cleanup);

const users = [
    {
        "email": "redninja@dojo.com",
        "id": 1,
        "username": "redninja"
    },
    {
        "email": "blueninja@dojo.com",
        "id": 2,
        "username": "blueninja"
    }
];

it("renders a username", () => {
    const { getByText } = render(<UsersList users={users} />);
    expect(getByText("redninja")).toHaveClass("username");
    expect(getByText("blueninja")).toHaveClass("username");
});
it('renders', () => {
    const { asFragment } = render(<UsersList users={users} />);
    expect(asFragment()).toMatchSnapshot();
}); 