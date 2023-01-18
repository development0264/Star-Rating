import React from 'react'
import star from '../img/star.svg';
import path from '../img/path.svg'
import starhalf from '../img/starhalf.svg'

export default function CustomRating(props) {
    const { starIndex } = props;

    const res = Array.from(Array(10)).map((_, i) => i + 1);

    return (
        <>
            {res.map((f, index) =>
                (!Number.isInteger(starIndex) && starIndex > res[index] && starIndex <= res[index + 1])
                    ? <img src={starhalf} alt='img' />
                    : (starIndex >= res[index]
                        ? <img src={path} alt='img' />
                        : <img src={star} alt='img' />))}
        </>
    )
}
