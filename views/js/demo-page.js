$(() => {
  // initialize the Router component
  window.prestashop.component.initComponents(['Router']);
  // initiate the search on button click
  $(document).on('click', '#demo_search_customer_btn', () => search($('#demo_search_customer').val()));

  /**
   * Performs ajax request to search for customers by search phrase
   *
   * @param searchPhrase
   */
  function search(searchPhrase) {
    // use the router component to generate the existing route
    var route = window.prestashop.instance.router.generate('admin_customers_search');

    // use the ajax request to get customers
    $.get(route, {
      'customer_search': searchPhrase,
      // render the customers
    }).then((data) => renderResults(data));
  }

  /**
     * Renders the results block
     *
     * @param {Object} data
     */
  function renderResults(data) {
    var $infoBlock = $('#info-block')
    $infoBlock.addClass('d-none').empty();
    var $resultsBlock = $('#customers-results');
    var $resultsBody = $('#customers-results tbody');

    if (data.found === false) {
      $infoBlock.text('No customers found').removeClass('d-none');
      $resultsBlock.addClass('d-none');
      $resultsBody.empty();

      return;
    }

    $resultsBlock.removeClass('d-none');
    $resultsBody.empty();

    for (const id in data.customers) {
      const customer = data.customers[id];
      $resultsBody.append(`<tr><td>${customer.email}</td></tr>`);
    }
  }
});
