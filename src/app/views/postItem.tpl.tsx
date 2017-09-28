import * as _ from 'underscore';
import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { LayoutGrid } from './containers/layoutGrid';
import { ProgressBar } from './controls/progress_bar';


const template = (props, actions, view) => {
    var post = _.extend({}, view.state.post, view.state.historyRecord);
    return <div className="mdc-card mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
        <section className="mdc-card__primary">
            <div className="mdc-card__section">
                <img src={post.author_avatar} height={32} />
                {post.roar_authors && post.roar_authors.map(x => <div key={x.id}>{x.title || x.displayname}</div>)}
            </div>
            <h1 className="mdc-card__title">{post.headline}</h1>
            <h2 className="mdc-card__subtitle" dangerouslySetInnerHTML={{ __html: post.subheadline }} />
        </section>
        <section className="mdc-card__actions">
            <button className="mdc-button mdc-button--compact mdc-card__action"
                onClick={() => view.showBody()}
            >body</button>
            <button className="mdc-button mdc-button--compact mdc-card__action"
                onClick={() => view.showDescription()}
            >description</button>
            <button className="mdc-button mdc-button--compact mdc-card__action">Details</button>
            <button className="mdc-button mdc-button--compact mdc-card__action"
              onClick={e => view.prevHistory()}
            >{view.prevItemIndex()}&lt;</button>
            <button className="mdc-button mdc-button--compact mdc-card__action"
              onClick={e => view.nextHistory()}
            >{view.nextItemIndex()}&gt;</button>
        </section>
        <section className="mdc-card__media" style={{
            backgroundImage: 'url(' + (post.image210x || post.image980x || post.image) + ')',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '12.313rem'
        }}>
            <img src={post.favicon} width={32} />
            <h1 className="mdc-card__title mdc-card__title--large"
                style={{ backgroundColor: 'rgba(200, 200, 200, .4)', color: 'white' }}
                dangerouslySetInnerHTML={{ __html: post.photo_credit }}
            />
            <h2 className="mdc-card__subtitle" style={{ backgroundColor: 'rgba(200, 200, 200, .4)', color: 'white' }}>
                <a href={post.post_url}>{post.post_url}</a>
            </h2> 
        </section>
        <section className="mdc-card__supporting-text"
            dangerouslySetInnerHTML={{
                __html: view.state.showBody
                    ? post.body
                    : view.state.showDescription
                        ? post.description
                        : [post.brief, post.continue_reading].join('<hr/>')
            }}
        />
        {post.listicle && post.listicle.items && post.listicle.items.length ? <section className="mdc-card__supporting-text">
            <div className="mdc-grid-list mdc-grid-list--tile-aspect-4x3">
                <ul className="mdc-grid-list__tiles">
                    {post.listicle.items.map(lItem => <li key={lItem.id} className="mdc-grid-tile">
                        {lItem.media_html ? <div className="mdc-grid-tile__primary"
                            dangerouslySetInnerHTML={{ __html: lItem.media_html }}
                        /> : <div className="mdc-grid-tile__primary"><div className="mdc-grid-tile__primary-content" style={{
                            backgroundImage: 'url(' + (lItem.image210x || lItem.image980x || lItem.image) + ')',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                            /></div>}
                        <span className="mdc-grid-tile__secondary">
                            <span className="mdc-grid-tile__title">{lItem.headline}</span>
                        </span>
                    </li>)}
                </ul>
            </div>
        </section> : null}
    </div>;
}

export { template };
