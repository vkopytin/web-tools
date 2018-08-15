import { DI } from './di/DI';
import { MainPresenter } from './presenters/main';
import { HomeSpace } from './spaces/home';
import { LoginSpace } from './spaces/login';
import { PlaylistsSpace } from './spaces/playlists';
import { TracksSpace } from './spaces/tracks';
import { SearchSpace } from './spaces/search';
import { SettingsSpace } from './spaces/settings';
import { FavoritesSpace } from './spaces/favorites';
import { Home } from './views/home';
import { Playlists } from './views/playlists';
import { Login } from './views/login';
import { Tracks } from './views/tracks';
import { Search } from './views/search';
import { Settings } from './views/settings';
import { Favorites } from './views/favorites';

DI.register({ MainPresenter });
DI.registerAsView({ Login, LoginSpace });
DI.registerAsView({ Playlists, PlaylistsSpace });
DI.registerAsView({ Tracks, TracksSpace });
DI.registerAsView({ Search, SearchSpace });
DI.registerAsView({ Settings, SettingsSpace });
DI.registerAsView({ Favorites, FavoritesSpace });
DI.registerAsView({ Home, HomeSpace });