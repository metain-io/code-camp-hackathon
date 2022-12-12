// import axios from '@api/metain/axios-client';
import { ChangeEvent, MouseEvent, useState, useEffect } from 'react';
import styles from './styles.module.scss';
// import moment from 'moment';

const MintNFT = () => {
    const [inputValue, setInputValue] = useState('Input value');

    const init = async () => {
        setInputValue('Input value');
    };

    useEffect(() => {
        init();
    }, []);

    const onButtonCreateClicked = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // const result = await axios.post('https://api.niatem-beta.com/hackathon/');
        // console.log(result);
    };

    return (
        <div id={styles.dividend_container}>
            <div className={styles.div_1}>
                <span className={styles.span_1}>Create New Item</span>
                <span className={styles.span_1}>* Required fields</span>
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Image, Video, Audio, or 3D Model *</span>
                <span className={styles.span_1}>
                    File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
                </span>
                <input
                    type="image"
                    className={[styles.input_1, 'form-control'].join(' ')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Name *</span>
                <input
                    type="text"
                    className={[styles.input_1, 'form-control'].join(' ')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>External link</span>
                <span className={styles.span_1}>
                    OpenSea will include a link to this URL on this item's detail page, so that users can click to learn
                    more about it. You are welcome to link to your own webpage with more details.
                </span>
                <input
                    type="text"
                    className={[styles.input_1, 'form-control'].join(' ')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Description</span>
                <span className={styles.span_1}>
                    The description will be included on the item's detail page underneath its image. Markdown syntax is
                    The description will be included on the item's detail page underneath its image. Markdown syntax is
                    supported.
                </span>
                <input
                    type="text"
                    className={[styles.input_1, 'form-control'].join(' ')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Collection</span>
                <span className={styles.span_1}>This is the collection where your item will appear.</span>
                <input
                    type="text"
                    className={[styles.input_1, 'form-control'].join(' ')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Properties</span>
                <span className={styles.span_1}>Textual traits that show up as rectangles</span>
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Levels</span>
                <span className={styles.span_1}>Numerical traits that show as a progress bar</span>
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Stats</span>
                <span className={styles.span_1}>Numerical traits that just show as numbers</span>
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Unlockable Content</span>
                <span className={styles.span_1}>
                    Include unlockable content that can only be revealed by the owner of the item.
                </span>
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Explicit & Sensitive Content</span>
                <span className={styles.span_1}>Set this item as explicit and sensitive content</span>
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Supply</span>
                <span className={styles.span_1}>The number of items that can be minted. No gas cost to you!</span>
                <input
                    type="text"
                    className={[styles.input_1, 'form-control'].join(' ')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Blockchain: Solana</span>
            </div>

            <div className={styles.div_1}>
                <span className={styles.span_2}>Freeze metadata</span>
                <span className={styles.span_1}>
                    Freezing your metadata will allow you to permanently lock and store all of this item's content in
                    decentralized file storage.
                </span>
                <span className={styles.span_2}>To freeze your metadata, you must create your item first.</span>
            </div>

            <button type="button" className={styles.button_1} onClick={onButtonCreateClicked}>
                Create
            </button>
        </div>
    );
};

export { MintNFT };
