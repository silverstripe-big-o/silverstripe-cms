/**
 * File: CMSMain.js
 */
(function($) {
	$.entwine('ss', function($){
		
		$('#pages-controller-cms-content').entwine({
			/**
			 * we need to check if the current url contains a sub url 'listchildren' and 
			 * select its list view if it does, otherwise use the default tabs() call which is
			 * using cookie options
			 */
			redrawTabs: function() {
				if(window.location.href.match(/listchildren/)){
					this.rewriteHashlinks();
					this.tabs({ selected: 1 }); 
				}else{
					this._super();
				}
			}
		});
	
		/**
		 * Class: #Form_SearchForm
		 * 
		 * Control the site tree filter.
		 * Toggles search form fields based on a dropdown selection,
		 * similar to "Smart Search" criteria in iTunes.
		 */
		$('#Form_SearchForm').entwine({
	
			/**
			 * Constructor: onmatch
			 */
			onmatch: function() {
				var self = this;

				// Reset binding through entwine doesn't work in IE
				this.bind('reset', function(e) {
					self._onreset(e);
				});
		
				this._super();
			},
	
			/**
			 * Function: onsubmit
			 * 
			 * Filter tree based on selected criteria.
			 */
			onsubmit: function(e) {
				var self = this;
				var data = [];
		
				// convert from jQuery object literals to hash map
				$(this.serializeArray()).each(function(i, el) {
					data[el.name] = el.value;
				});
		
				// TODO Disable checkbox tree controls that currently don't work with search.
				this.find('.checkboxAboveTree :checkbox').attr('disabled', 'disabled');
				
				// TODO disable buttons to avoid multiple submission
				//this.find(':submit').attr('disabled', true);
		
				this.find(':submit[name=action_doSearchTree]').addClass('loading');
				
				var params = this.serializeArray();
				this._reloadSitetree(params);
				this._reloadListview(params);

				return false;
			},
		
			/**
			 * Function: onreset
			 * 
			 * Parameters:
			 *  (Event) e
			 */
			_onreset: function(e) {
				// TODO Enable checkbox tree controls
				this.find('.checkboxAboveTree :checkbox').attr('disabled', 'false');

				this.resetForm();
				//the dropdown field wont be reset due to it is applied to chosen.js so need to treated specially
				this.find('.field.dropdown select').val('').trigger("liszt:updated");
				this._reloadSitetree();
				this._reloadListview();
				return false;
			},
	
			/**
			 * Function: _reloadSitetree
			 */
			_reloadSitetree: function(params) {
				var self = this;
		
				$('.cms-tree').search(
					params,
					function() {
						self.find(':submit').attr('disabled', false).removeClass('loading');
						self.find('.checkboxAboveTree :checkbox').attr('disabled', 'true');
					},
					function() {
						self.find(':submit').attr('disabled', false).removeClass('loading');
						self.find('.checkboxAboveTree :checkbox').attr('disabled', 'true');
						errorMessage('Could not filter site tree<br />' + response.responseText);
					}
				);		
			},
			
			_reloadListview: function(params){
				$('.cms-list').refresh(params);
				
			}
		});
		
		$('#cms-content-listview .cms-list').entwine({
			refresh: function(params){
				var self = this;
				
				$.ajax({
					url: this.data('url-list'),
					data: params,
					success: function(data, status, xhr) {
						self.html(data);
					},
					error: function(xhr, status, e) {
						errorMessage(e);
					}
				});
			},
			replace: function(url){
				if(window.History.enabled) {
					var container = $('.cms-container')
					container.loadPanel(url, '', {selector: '.cms-list form'});
				} else {
					window.location = $.path.makeUrlAbsolute(url, $('base').attr('href'));
				}
			}
		});
		
		$('.cms-list .list-children-link').entwine({
			onclick: function(e) {
				this.closest('.cms-list').replace(this.attr('href'));
				e.preventDefault();
				return false;

			}
		});
	});
})(jQuery);