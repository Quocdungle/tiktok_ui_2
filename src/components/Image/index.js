import { useState, forwardRef } from 'react';
import styles from './Image.module.css';
import images from '~/assets/images';
import classNames from 'classnames';

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');
    const handleError = () => {
        setFallback(customFallback);
    };
    return (
        <img
            className={classNames(styles.wrapper, className)}
            {...props}
            src={fallback || src}
            alt={alt}
            ref={ref}
            onError={handleError}
        />
    );
});

export default Image;
