import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// BEGIN (write your solution here)
import { fetchChannels } from '../slices/channelsSlice';
// END

const Channels = () => {
    const dispatch = useDispatch();
    // BEGIN (write your solution here)
    const channels = Object.values(useSelector((state) => state.channels.entities));


    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);
    // END

    return channels && (
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>Каналы</span>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2">
                {channels.map(({ id, name }) => (
                    <li key={id} className="nav-item w-100">
                        <button type="button" className="w-100 rounded-0 text-start btn">
                            <span className='me-1'>#</span>
                            {name}
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Channels;
