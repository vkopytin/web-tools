const render = data => <div id="display" class="flip sidebar mdc-typography">
    <div id="info-body">
        <header>
            <a href="#" class="button" onClick={() => closeApp()}>close</a>
            <h1>{data.currentSite.url}</h1>
        </header>
        {data.state.pending
            ? <ProgressBar />
            : ''
        }
        <section class="content body">
            <div class="card">
                <h2>Sites</h2>
                <p class="profile-text">{data.currentSite.url}</p>
                <ul class="mdc-simple-menu__items mdc-list" data-binding="{binding: Sites}">
                    {data.sites.map(item =>
                        <li key={item.url} class="mdc-list-item site" data-id={item.id} data-binding="{binding: id}">
                            <a href="javascript: void(0);">{item.url}</a>
                        </li>
                    )}
                    <li class="mdc-list-item" role="menuitem">
                        <a href="javascript: void(0);">Settings</a>
                    </li>
                </ul>
            </div>
            <div>
                <div class="region mdc-form-field mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                    <input type="text"
                        class="mdc-textfield__input search-post"
                        id="my-textfield"
                        name="searchTerm"
                        placeholder="search"
                        value={data.searchPost}
                        onFocus={e => data.view.onFocus(e)}
                        onBlur={e => data.view.onBlur(e)}
                        onChange={(e) => e.target.value ? actions.searchPosts(e.target.value) : actions.loadPosts()}
                    />
                </div>
            </div>
            <ul>
                {data.state.posts.map(item => <li key={item.id} post={item} />)}
            </ul>
            <div class="card mdc-form-field">
                <button class="mdc-button mdc-button--raised mdc-button--primary mdc-ripple-surface">Load Posts</button>
            </div>
        </section>
    </div>
</div>


export { render };