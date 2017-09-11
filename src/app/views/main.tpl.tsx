import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';

const closeApp = () => {
    var elWebTools = document.getElementById('web-tools');
    unmountComponentAtNode(elWebTools);
    elWebTools.parentNode.removeChild(elWebTools);
}

const template = (state, actions, view) => <div className="sidebar mdc-typography">
    <header className="mdc-toolbar">
        <div className="mdc-toolbar__row">
            <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                <a href="#" className="material-icons mdc-toolbar__icon--menu" onClick={() => closeApp()}>close</a>
                <span className="mdc-toolbar__title">Title</span>
            </section>
            <section className="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
                <a href="#" className="sites-menu material-icons mdc-toolbar__icon" aria-label="Bookmark this page">more_vert
                    <div className="mdc-simple-menu">
                        <ul className="mdc-simple-menu__items mdc-list">
                            {state.sites.map(site =>
                                <li key={site.url} className="mdc-list-item" role="menuitem"
                                    onClick={() => {
                                        actions.updateDomainUrl(site.url);
                                        actions.loadPosts(state.search);
                                    }}
                                 >
                                    {site.url}
                                </li>
                            )}
                            <li className="mdc-list-divider" role="separator"></li>
                            <li className="mdc-list-item" role="menuitem">Settings</li>
                        </ul>
                    </div>
                </a> 
            </section>
        </div>
    </header>
    {state.pending
        ? <div role="progressbar" className="mdc-linear-progress mdc-linear-progress--indeterminate">
          <div className="mdc-linear-progress__buffering-dots"></div>
          <div className="mdc-linear-progress__buffer"></div>
          <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
            <span className="mdc-linear-progress__bar-inner"></span>
          </div>
          <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
            <span className="mdc-linear-progress__bar-inner"></span>
          </div>
        </div>
        : null
    }
    <section className="content">
        <div className="mdc-layout-grid max-width"><div className="mdc-layout-grid__inner">
            <div className="mdc-form-field mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                <div className={"mdc-textfield mdc-textfield--upgraded" + (view.state.isFocused ? " mdc-textfield--focused" : "")}>
                    <input type="text"
                    className="mdc-textfield__input"
                    id="my-textfield" name="searchTerm"
                    defaultValue={state.search}
                    onFocus={e => view.onFocus(e)}
                    onBlur={e => view.onBlur(e)}
                    onChange={(e) => actions.loadPosts(e.target.value)}
                    />
                    <label htmlFor="my-textfield"
                        className={"mdc-textfield__label" + (view.state.isFocused || state.search ? " mdc-textfield__label--float-above": "")}>
                        Text Field
                    </label>
                </div>
            </div>
        </div></div>
        <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__inner">
                {state.posts.map(item => <div className="mdc-card mdc-layout-grid__cell mdc-layout-grid__cell--span-12" key={item.id || item}>
                    <section className="mdc-card__primary">
                        <div className="mdc-card__section">
                            <img src={item.author_avatar} height={32} />
                        </div>
                        <h1 className="mdc-card__title">{item.headline}</h1>
                        <h2 className="mdc-card__subtitle">{item.subheadline}</h2>
                    </section>
                    <section className="mdc-card__media" style={{
                        backgroundImage: 'url(' + item.image35x35 || item.image980x || item.image + ')',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '12.313rem'}}>
                        <img src={item.favicon} width={32} />
                    </section>
                    <section className="mdc-card__supporting-text"
                        dangerouslySetInnerHTML={{ __html: item.brief }}
                    />
                    {item.listicle && item.listicle.items && item.listicle.items.length ? <section className="mdc-card__supporting-text">
                        <div className="mdc-grid-list mdc-grid-list--tile-aspect-4x3">
                            <ul className="mdc-grid-list__tiles">
                                {item.listicle.items.map(lItem => <li key={lItem.id} className="mdc-grid-tile">
                                    {lItem.media_html ? <div className="mdc-grid-tile__primary"
                                        dangerouslySetInnerHTML={{ __html: lItem.media_html }}
                                    /> : <div className="mdc-grid-tile__primary" style={{
                                            backgroundImage: 'url(' + item.image35x35 || item.image980x || item.image + ')',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            height: '12.313rem'
                                        }}
                                     />}
                                    <span className="mdc-grid-tile__secondary">
                                        <span className="mdc-grid-tile__title">{lItem.headline}</span>
                                    </span>
                                </li>)}
                            </ul>
                        </div>
                    </section>: null}
                    <section className="mdc-card__actions">
                        <button className="mdc-button mdc-button--compact mdc-card__action">Action 1</button>
                        <button className="mdc-button mdc-button--compact mdc-card__action">Action 2</button>
                    </section>
                </div>)}
            </div>
        </div>
        <div className="mdc-form-field">
            <button className="mdc-button mdc-button--raised mdc-button--primary mdc-ripple-surface"
                onClick={() => actions.loadPosts('test')}>Test</button>
        </div>
    </section>    
</div>

export { template };
