import React from 'react';
import Select from 'react-select';
import CustomRating from './CustomRating';

export default function AutoComplete(props) {
    const { movieName } = props;
    const CustomOption = (props) => {
        const { data, innerProps } = props;
        return <div {...innerProps}>
            <div className='d-flex align-items-center justify-content-between  matrix-dropdown'>
                <h4>{data.label}</h4>
                <h6>{data.category}</h6>
            </div>
            <div style={{ padding: '0px 16px' }}>
                <CustomRating starIndex={data.ratings} />
            </div>
        </div>
    }

    return (
        <div className='select-dropdown'>
            <Select
                className="select-inner"
                classNamePrefix="select"
                isDisabled={false}
                components={{ Option: CustomOption, DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                isLoading={false}
                isClearable={true}
                isSearchable={true}
                name="movies"
                options={movieName}
                menuIsOpen={true}
            />
        </div>
    );
};