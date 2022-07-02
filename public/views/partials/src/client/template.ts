import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
/// <reference path="../../node_modules/@types/bootstrap/index.d.ts" />
import * as bootstrap from 'bootstrap';

export default class Template {
	modalClose(id: string) {
		const modalEl = document.getElementById('modal-'+id);
		const modal = bootstrap.Modal.getInstance(modalEl);
		modal.hide();
	}
	
	createElementFromHTML(htmlString: string) {
		const div = document.createElement('div');
		div.innerHTML = htmlString.trim();
		return div.firstElementChild;
	}
	
	modal(id: string, title: string, content: any, cb?: () => void, size?: string) {
		let html = '<div id="modal-'+id+'" class="modal" tabindex="-1"><div class="modal-dialog '+size+'"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">'+title+'</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">'+content+'</div></div></div></div>';
		
		document.body.insertAdjacentElement('beforeend', this.createElementFromHTML(html));
		
		const modal = new bootstrap.Modal(document.getElementById('modal-'+id), {keyboard: false});
		
		modal.show();
		
		let rootElement = document.querySelector('body');
		rootElement.addEventListener('hidden.bs.modal', (evt) => {
			let targetElement = evt.target as Element;
			while(targetElement != null){
				if(targetElement.matches('#modal-'+id)){
          this.modalClose(id);
					if(cb !== null && cb != undefined){
						cb();
					}
        }
        targetElement = targetElement.parentElement;
      }
    }, true);
	}
	
	fbInit() {
		let js, fjs = document.getElementsByTagName('script')[0];
		if(document.getElementById('facebook-jssdk')) return;
		js = document.createElement('script');
		js.id = 'facebook-jssdk';
		js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&autoLogAppEvents=1&version=v2.12&appId=199922540602335';
		fjs.parentNode.insertBefore(js, fjs);
	}
}
