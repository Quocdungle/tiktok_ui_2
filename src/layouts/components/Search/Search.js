import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import * as searchServices from '~/services/searchService';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);
function Search() {
    const [searchresult, setSearchresult] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    //1: debouncde = ''
    //2: debouncde = 'h'
    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchresult([]);
            return;
        }
        setLoading(true);
        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debouncedValue);
            setSearchresult(result);

            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchresult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange = (e) => {
        const searchData = e.target.value;

        if (!searchData.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };
    // const handleSubmit = (e) => {
    //     e.prevenDefault();
    // };
    return (
        //
        <div>
            <HeadlessTippy
                interactive
                appendTo={() => document.body}
                visible={showResult && searchresult.length > 0}
                render={(attrs) => (
                    <div
                        className={cx('search-result')}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchresult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        value={searchValue}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && searchValue.trim() !== '' && (
                        <button className={cx('clear')} onClick={handleClear}>
                            {/* clear */}
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {/* Loading */}
                    {loading && (
                        <FontAwesomeIcon
                            className={cx('loading')}
                            icon={faSpinner}
                        />
                    )}

                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {/* search */}
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
