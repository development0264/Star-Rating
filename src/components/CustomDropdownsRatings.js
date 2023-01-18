import React, { forwardRef } from 'react'
import { Dropdown, Form } from 'react-bootstrap';
import CustomRating from './CustomRating';

export default function CustomDropdownsRatings(props) {
    const { heading, menuItems, setRatings } = props;

    const CheckDropdownItem = forwardRef(
        ({ children, id, checked, onChange }, ref) => {
            return (
                <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
                    <Form.Check
                        type="checkbox"
                        label={children}
                        checked={checked}
                        onChange={onChange.bind(onChange, id)}
                    />
                </Form.Group>
            );
        }
    );

    const handleChecked = (key, event) => {
        const ratingsArray = [...menuItems];
        const ratingIndex = ratingsArray.findIndex((data) => data.rating === key);
        ratingsArray[ratingIndex].checked = event.target.checked;
        setRatings(ratingsArray);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle className='rating-btn genre-btn' id="dropdown-basic">{heading}</Dropdown.Toggle>
            <Dropdown.Menu>
                {menuItems.map((item, index) =>
                    <div key={index}>
                        <Dropdown.Item
                            key={item.rating}
                            as={CheckDropdownItem}
                            id={item.rating}
                            checked={item.checked}
                            onChange={handleChecked}>
                            {index === 0 ? "Any Ratings" : <CustomRating starIndex={index} />}
                        </Dropdown.Item>
                    </div>
                )}
            </Dropdown.Menu>
        </Dropdown >
    )
}
