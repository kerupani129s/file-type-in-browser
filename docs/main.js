(() => {

	const convert = (() => {

		const result = document.getElementById('result');

		// 
		const getFilenameExtension = filename => {
			const [, ext] = filename.match(/^(?:.+?)(\.[^.]+)?$/);
			return ext;
		};

		const escapeHTML = html => html
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;').replaceAll('\'', '&#39;');

		const convert = files => {

			for (const file of files) {

				const name = file.name;
				const type = file.type;

				const ext = getFilenameExtension(name);

				const html = '<div>' +
					escapeHTML(name) + ': ' +
					(type ? escapeHTML(type) : 'unknown') +
					(ext ? ' (' + escapeHTML(ext) + ')' : '') +
					'</div>';

				result.insertAdjacentHTML('afterbegin', html);

			}

		};

		return convert;

	})();

	(() => {

		const inputFileElement = document.getElementById('file');

		const convertOnEvent = files => {

			inputFileElement.disabled = true;

			convert(files);

			inputFileElement.disabled = false;

		};

		// 
		inputFileElement.addEventListener('click', () => {
			inputFileElement.value = '';
		});

		inputFileElement.addEventListener('change', event => {
			const files = event.target.files;
			if ( ! files.length ) return;
			convertOnEvent(files);
		});

		inputFileElement.disabled = false;

	})();

})();
