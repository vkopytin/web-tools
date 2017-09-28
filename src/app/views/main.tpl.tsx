import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { LayoutGrid } from './containers/layoutGrid';
import { ProgressBar } from './controls/progress_bar';
import { PostItem } from './postItem';


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
                <span className="mdc-toolbar__title">{view.props.url}</span>
            </section>
            <section className="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
                <a href="#" className="sites-menu material-icons mdc-toolbar__icon" aria-label="Bookmark this page">more_vert
                </a> 
                <div className="mdc-simple-menu">
                    <ul className="mdc-simple-menu__items mdc-list">
                        {state.sites.map(site =>
                            <li key={site.url} className="mdc-list-item" role="menuitem"
                                onClick={() => {
                                    actions.updateDomainUrl(site);
                                    state.search
                                        ? actions.searchPosts(state.search)
                                        : actions.loadPosts()
                                }}
                                >
                                {site.url}
                            </li>
                        )}
                        <li className="mdc-list-divider" role="separator"></li>
                        <li className="mdc-list-item" role="menuitem">Settings</li>
                    </ul>
                </div>
            </section>
        </div>
    </header>
    {state.pending
        ? <ProgressBar/>
        : null
    }
    <section className="content">
        <LayoutGrid>
            <div className="mdc-form-field mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                <div className={"mdc-textfield mdc-textfield--upgraded" + (view.state.isFocused ? " mdc-textfield--focused" : "")}>
                    <input type="text"
                    className="mdc-textfield__input"
                    id="my-textfield" name="searchTerm"
                    defaultValue={state.search}
                    onFocus={e => view.onFocus(e)}
                    onBlur={e => view.onBlur(e)}
                    onChange={(e) => e.target.value ? actions.searchPosts(e.target.value) : actions.loadPosts()}
                    />
                    <label htmlFor="my-textfield"
                        className={"mdc-textfield__label" + (view.state.isFocused || state.search ? " mdc-textfield__label--float-above": "")}>
                        Text Field
                    </label>
                </div>
            </div>
        </LayoutGrid>
        <LayoutGrid>
            {state.posts.map(item => <PostItem  key={item.id} post={item}/>)}
        </LayoutGrid>
        <div className="mdc-form-field">
            <button className="mdc-button mdc-button--raised mdc-button--primary mdc-ripple-surface"
                onClick={() => actions.loadPosts()}>Load Posts</button>
        </div>
    </section>
</div>

export { template };
