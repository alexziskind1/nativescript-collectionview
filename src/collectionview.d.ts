import { KeyedTemplate, PercentLength, Template, View } from 'tns-core-modules/ui/core/view';
import { ItemsSource } from 'tns-core-modules/ui/list-view';
import { EventData } from 'tns-core-modules/data/observable';

export type Orientation = 'horizontal' | 'vertical';

export class CollectionView extends View {
    public static debug: boolean;
    public static itemLoadingEvent: string;
    public static itemTapEvent: string;
    public static loadMoreItemsEvent: string;

    public items: any[] | ItemsSource;
    public itemTemplate: string | Template;
    public itemTemplates: string | KeyedTemplate[];
    public rowHeight: PercentLength;
    public colWidth: PercentLength;
    public orientation: Orientation;
    public isBounceEnabled: boolean;
    public isScrollEnabled: boolean;

    // public ios: any; /* UICollectionView */
    // public android: any; /* android.support.v7.widget.RecyclerView */

    public refresh();
    public scrollToIndex(index: number, animated?: boolean);
    public onItemTemplatesPropertyChanged(oldValue: any, newValue: any): void;
    public itemViewLoader?: (viewType) => any;
}

export interface CollectionViewItemEventData extends EventData {
    eventName: string;
    object: CollectionView;
    index: number;
    view: View;
    bindingContext?: any;
}

/**
 * Defines the different view types that {@link RadListView} can display in various scenarios.
 */
export enum ListViewViewTypes {
    /**
     * Identifies a view created using the {@link itemTemplate} value.
     */
    ItemView
}