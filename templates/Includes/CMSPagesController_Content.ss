<div id="pages-controller-cms-content" class="cms-content center ss-tabset $BaseCSSClasses" data-layout-type="border">

	<div class="cms-content-header north">
		<div>
			<h2 id="cms-content-breadcrumbs">
				<% include CMSBreadcrumbs %>
			</h2>
		
			<div class="cms-content-header-tabs">
				<ul>
					<li>
						<a href="#cms-content-treeview" class="content-treeview"><% _t('CMSPagesController.TreeView', 'Tree View') %></a>
					</li>
					<li>
						<a href="#cms-content-listview" class="content-listview"><% _t('CMSPagesController.ListView', 'List View') %></a>
					</li>
					<!--
					<li>
						<a href="#cms-content-galleryview" class="content-galleryview"><% _t('CMSPagesController.GalleryView', 'Gallery View') %></a>
					</li>
					-->
				</ul>
			</div>
		</div>
	</div>

	$Tools

	<div class="cms-content-fields center ui-widget-content cms-panel-padded">
		
		<div id="cms-content-treeview">
			
			<div class="cms-content-toolbar">
				<% include CMSPagesController_ContentToolbar %>
			</div>
			
			<div class="cms-tree" data-url-tree="$Link(getsubtree)" data-url-savetreenode="$Link(savetreenode)" data-hints="$SiteTreeHints">
				$SiteTreeAsUL
			</div>

		</div>
	
		<div id="cms-content-listview">
			<div class="cms-content-toolbar">
				<% include CMSPagesController_ContentToolActions %>
			</div>
			
			<div class="cms-list" data-url-list="$Link(getListViewHTML)">
				$ListView
			</div>
		</div>
		<!--
		<div id="cms-content-galleryview">
			<i>Not implemented yet</i>
		</div>
		-->
		
	</div>
	
</div>