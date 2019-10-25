<?php

namespace Yoast\WP\Free\Tests\Presenters\Twitter;

use Mockery;
use Yoast\WP\Free\Presentations\Indexable_Presentation;
use Yoast\WP\Free\Presenters\Twitter\Description_Presenter;
use Yoast\WP\Free\Tests\TestCase;

/**
 * Class Description_Presenter_Test.
 *
 * @coversDefaultClass \Yoast\WP\Free\Presenters\Twitter\Description_Presenter
 *
 * @group presenters
 * @group twitter
 * @group twitter-description
 */
class Description_Presenter_Test extends TestCase {

	/**
	 * @var \WPSEO_Replace_Vars|Mockery\MockInterface
	 */
	protected $replace_vars;

	/**
	 * @var Description_Presenter
	 */
	protected $instance;

	/**
	 * Setup of the tests.
	 */
	public function setUp() {
		$this->replace_vars = Mockery::mock( \WPSEO_Replace_Vars::class );

		$this->instance = new Description_Presenter();
		$this->instance->set_replace_vars_helper( $this->replace_vars );

		return parent::setUp();
	}

	/**
	 * Tests the presentation for a set twitter description.
	 *
	 * @covers ::present
	 * @covers ::filter
	 */
	public function test_present() {
		$presentation = new Indexable_Presentation();
		$presentation->replace_vars_object = [];
		$presentation->twitter_description = 'This is the twitter description';

		$this->replace_vars
			->expects( 'replace' )
			->andReturn( 'This is the twitter description' );

		$this->assertEquals(
			'<meta name="twitter:description" content="This is the twitter description" />',
			$this->instance->present( $presentation )
		);
	}

	/**
	 * Tests the presentation of an empty description.
	 *
	 * @covers ::present
	 * @covers ::filter
	 */
	public function test_present_with_empty_twitter_description() {
		$presentation = new Indexable_Presentation();
		$presentation->replace_vars_object = [];
		$presentation->twitter_description = '';

		$this->replace_vars
			->expects( 'replace' )
			->andReturn( '' );

		$this->assertEmpty( $this->instance->present( $presentation ) );
	}

}